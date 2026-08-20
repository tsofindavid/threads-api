<html><head><title>Retrieve and Manage Replies</title><meta charset="UTF-8" /><style nonce="yVT9sp5j">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Retrieve and Manage Replies



The Threads Reply Management API allows you to read and manage replies to users&#039; own Threads.

## Permissions

The Threads Reply Management API requires an appropriate access token and permissions based on the node you are targeting. While you are testing, you can easily generate tokens and grant your app permissions by using the Graph API Explorer.

* `threads_basic` — Required for making any calls to all Threads API endpoints.
* `threads_manage_replies` — Required for making `POST` calls to reply endpoints.
* `threads_read_replies` — Required for making `GET` calls to reply endpoints.

## Rate Limits

Threads profiles are limited to 1,000 API-published replies within a 24-hour moving period. You can retrieve a profile&#039;s current Threads replies rate limit usage with the `GET /&#123;threads-user-id&#125;/threads_publishing_limit` endpoint.

**Note:** This endpoint requires the `threads_basic`, `threads_content_publish`, and `threads_manage_replies` permissions.

#### Fields

| Name | Description |
| --- | --- |
| `reply_quota_usage` | Threads reply publishing count over the last 24 hours. |
| `reply_config` | Threads reply publishing rate limit config object, which contains the `quota_total` and `quota_duration` fields. |

#### Example Request

```
curl -s -X GET \
  &quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads_publishing_limit?fields=reply_quota_usage,reply_config&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot;
```

#### Example Response

```
&#123;
  &quot;data&quot;: [
    &#123;
      &quot;reply_quota_usage&quot;: 1,
      &quot;reply_config&quot;: &#123;
        &quot;quota_total&quot;: 1000,
        &quot;quota_duration&quot;: 86400
      &#125;
    &#125;
  ]
&#125;
```

## Next Steps

* [Create Replies](https://developers.facebook.com/documentation/threads/retrieve-and-manage-replies/create-replies)
* [Retrieve Replies and Conversations](https://developers.facebook.com/documentation/threads/retrieve-and-manage-replies/replies-and-conversations)
* [Reply Management](https://developers.facebook.com/documentation/threads/reply-management)
</pre></body></html>