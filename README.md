# threads-api

Typed client library for the [Threads Graph API](https://developers.facebook.com/documentation/threads).
Runs on Bun and Node.js (uses only standard `fetch`/`URL`/`URLSearchParams`).

## Install

```sh
npm i @tsofindavid/threads-api
```

With npm:

```sh
npm install @tsofindavid/threads-api
```

With yarn:

```sh
yarn add @tsofindavid/threads-api
```

With pnpm:

```sh
pnpm add @tsofindavid/threads-api
```

With bun:

```sh
bun add @tsofindavid/threads-api
```

## Quick start

```ts
import { ThreadsAPI } from "threads-api"

const client = new ThreadsAPI({ accessToken: process.env.THREADS_ACCESS_TOKEN })

const { id } = await client.raw.publishing.createContainer("me", {
  media_type: "TEXT",
  text: "Hello from threads-api",
})
await client.raw.publishing.publishContainer("me", id)
```

## Architecture

The client is split into two strictly non-overlapping layers on top of a single transport:

| Layer | Purpose | Access |
| --- | --- | --- |
| **Raw** | methods 1:1 with API endpoints, no business logic | `client.raw.*` |
| **Convenience** | wrappers on top of raw: composition, pagination, polling, helpers | `client.*`, `client.paginate`, `metricsFrom` |

Dependencies flow in one direction only: `models ← raw ← convenience`. The reverse is prohibited.

## Raw layer

One method per endpoint; signatures mirror the spec. No defaults or call-chaining.

```ts
// Publishing
await client.raw.publishing.createContainer(userId, { media_type: "IMAGE", image_url, text })
await client.raw.publishing.publishContainer(userId, creationId)
await client.raw.publishing.getContainerStatus(containerId, "id,status,error_message")
await client.raw.publishing.repost(mediaId)
await client.raw.publishing.delete(mediaId)

// Media retrieval
await client.raw.media.get(mediaId, "id,text,permalink")
await client.raw.media.search({ q: "threads", search_type: "RECENT", media_type: "IMAGE" })

// Reply management
await client.raw.replyManagement.listReplies(mediaId, { reverse: true })
await client.raw.replyManagement.getConversation(mediaId)
await client.raw.replyManagement.manageReply(replyId, true)   // hide
await client.raw.replyManagement.listPendingReplies(mediaId)
await client.raw.replyManagement.managePendingReply(replyId, true) // approve

// User
await client.raw.user.getThreads(userId)
await client.raw.user.getProfile(userId)
await client.raw.user.lookupProfile("username")
await client.raw.user.getProfilePosts("username")
await client.raw.user.getPublishingLimit(userId)
await client.raw.user.getReplies(userId)
await client.raw.user.getMentions(userId)
await client.raw.user.getGhostPosts(userId)

// Locations
await client.raw.locations.get(locationId)
await client.raw.locationSearch.search({ query: "Paris", latitude, longitude })

// Insights
await client.raw.insights.getMediaInsights(mediaId, "views,likes")
await client.raw.insights.getUserInsights(userId, "views,followers_count", { since, until })

// oEmbed (no token required)
await client.raw.oembed.get("https://www.threads.com/t/DDzbnVKx57R", 500)

// Debug
await client.raw.debug.token(inputToken)

// Token endpoints
await client.raw.authTokens.exchangeToken(shortLived, clientSecret)   // short → long
await client.raw.authTokens.refreshLongLivedToken(longLived)          // refresh
await client.raw.authTokens.getAppToken(appId, appSecret)             // app token
await client.raw.authTokens.exchangeCode({ client_id, client_secret, code, redirect_uri })
```

## Convenience layer

```ts
// Create a container and publish it right away
await client.publishing.createAndPublish(userId, { media_type: "TEXT", text: "Hello" })

// Poll a container until a terminal status (per spec recommendations)
const status = await client.publishing.waitForContainer(containerId, {
  intervalMs: 60_000,   // once per minute
  timeoutMs: 5 * 60_000,
})

// Pagination: async iterator over the `after` cursor
const all = await collect(client.media.searchAll({ q: "threads" }))
for await (const post of client.media.searchAll({ q: "threads", media_type: "IMAGE" })) {
  console.log(post.permalink)
}

// Generic pagination over any raw method that returns a page
for await (const item of client.paginate((pp) => client.raw.user.getThreads("me", pp))) {
  // ...
}

// metric: object → string for insights
await client.raw.insights.getUserInsights(userId, metricsFrom({ views: true, likes: true }))
```

## Errors

A single hierarchy rooted at `ThreadsAPIError`. Transport-library exceptions never escape.

```ts
import {
  ThreadsAPIError,
  ThreadsNetworkError,
  ThreadsTimeoutError,
  ThreadsAuthenticationError,
  ThreadsPermissionError,
  ThreadsRateLimitError,
  ThreadsRequestError,
  ThreadsServerError,
  ThreadsParseError,
} from "threads-api"

try {
  await client.raw.user.getProfile("me")
} catch (err) {
  if (err instanceof ThreadsAuthenticationError) {
    // token expired — re-issue / refresh
  } else if (err instanceof ThreadsRateLimitError) {
    // not retriable: limit is a rolling 24h window
  }
}
```

Common error fields: `status`, `providerCode`, `requestId` (`fbtrace_id`), `responseBody` (redacted — secrets replaced with `[REDACTED]`), `retriable`.

**Retriable:** network errors, timeout, 5xx. The transport retries automatically with exponential backoff (`maxRetries` defaults to 3).

**Not retriable:** 4xx (including 429 — the limit rolls over 24h), 401, 403.

## Authentication

`TokenProvider` is a separate abstraction. By default a fixed token is used:

```ts
const client = new ThreadsAPI({ accessToken: "..." })
```

Auto-refresh on 401 via `RefreshingTokenProvider`. The refresh callback is injected by the consumer:

```ts
import { ThreadsAPI, RefreshingTokenProvider } from "threads-api"

const auth = new RefreshingTokenProvider({
  token: longLivedToken,
  refresh: async () => {
    const { access_token } = await client.raw.authTokens.refreshLongLivedToken(longLivedToken)
    return access_token
  },
})

const client = new ThreadsAPI({ auth })
```

Custom implementation: implement the `TokenProvider` interface (`getToken()` plus optional `refresh()`) and pass it via `config.auth`.

Secrets (`access_token`, `client_secret`, etc.) never appear in error messages or logs.

## Configuration

```ts
const client = new ThreadsAPI({
  accessToken: "...",
  baseUrl: "https://graph.threads.net",   // default
  apiVersion: "v1.0",                      // default
  timeoutMs: 30_000,                       // default
  retry: { maxRetries: 3, initialDelayMs: 200, maxDelayMs: 8000 },
  hooks: {
    onRequest: (spec) => {},       // request tracing/logging
    onResponse: (spec) => {},      // response tracing/logging
  },
  fetch: customFetch,              // transport injection (tests, proxies)
})
```

The library never reads environment variables and never prints to stdout. Logging happens only through `hooks` or your logger.

## Package subpath imports

```ts
import type { ThreadsMedia } from "threads-api/models"
import { ThreadsAPIError } from "threads-api/errors"
import { FetchTransport } from "threads-api/transport"
import { StaticTokenProvider } from "threads-api/auth"
import { RawPublishing } from "threads-api/raw"
import { paginate } from "threads-api/convenience"
```

## Testing

```sh
bun test
```

The transport is swapped via `config.fetch` or `FetchTransport` without monkey-patching. Example raw test:

```ts
import { FetchTransport, StaticTokenProvider } from "threads-api"
import { RawUser } from "threads-api/raw"

const fetchImpl = () => Promise.resolve(new Response(JSON.stringify({ id: "1", username: "u" }), { status: 200 }))
const transport = new FetchTransport({
  baseUrl: "https://graph.threads.net",
  apiVersion: "v1.0",
  auth: new StaticTokenProvider("tok"),
  timeoutMs: 5000,
  retry: { maxRetries: 3, initialDelayMs: 1, maxDelayMs: 5 },
  fetchImpl,
})
const user = await new RawUser(transport).getProfile("me")
```

## API docs

The spec is mirrored locally under `docs/` (see `download_threads_docs.sh`). No OpenAPI codegen is used — the spec is markdown only, so the raw layer is maintained by hand.
