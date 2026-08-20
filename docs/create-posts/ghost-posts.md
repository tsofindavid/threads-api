<html><head><title>Ghost posts</title><meta charset="UTF-8" /><style nonce="6z7nAqHz">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Ghost Posts



You can create ghost posts using the Threads API. Ghost posts allow you to create text posts which will be auto-archived after 24 hours.

### Limitations

* Ghost posts are text-only posts.
* You cannot reply to any post with a ghost post.
* The only feature supported with ghost posts is [text spoilers](https://developers.facebook.com/documentation/threads/create-posts/spoilers).

## Create a Ghost Post

### Step 1: Create a media container

Use the `POST /&#123;threads-user-id&#125;/threads` endpoint to create a media container with the `is_ghost_post` parameter.

#### Example request

```html
curl -i -X POST \
  -d &quot;media_type=TEXT&quot; \
  -d &quot;text=&lt;TEXT&gt;&quot;&quot; \
  -d &quot;access_token=&lt;ACCESS_TOKEN&gt;&quot;&quot; \
  -d &quot;is_ghost_post=true&quot; \
&quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads&quot;
```

#### Example response

```json
&#123;
  &quot;id&quot;: &quot;&lt;MEDIA_CONTAINER_ID&gt;&quot;
&#125;
```

The request above creates a Threads media container that, once [published](https://developers.facebook.com/documentation/threads/posts#step-2--publish-a-threads-media-container), will create a ghost post.

### Step 2: Publish the media container

You can [publish](https://developers.facebook.com/documentation/threads/posts#step-2--publish-a-threads-media-container) using the returned Threads media container ID to create your ghost post.

## Learn More

* [Retrieve a List of an App-Scoped User&#039;s Ghost Posts](https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts/retrieve-posts#retrieve-a-list-of-an-app-scoped-user-s-ghost-posts)
</pre></body></html>