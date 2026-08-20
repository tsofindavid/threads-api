<html><head><title>Quote Posts</title><meta charset="UTF-8" /><style nonce="BNfR1kFH">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Quote Posts



You can use the Threads API to quote another post.

## Publishing

You can quote another post when making a request to the `POST /threads` endpoint to [create a media object](https://developers.facebook.com/documentation/threads/posts#step-1--create-a-threads-media-container). Make sure to include the following parameter with your API request:

* `quote_post_id` — ID of another post that you want to quote.

### Example Request

```
curl -i -X POST \
  &quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads?media_type=IMAGE&amp;image_url=https://www.example.com/images/bronz-fonz.jpg&amp;text=BronzFonz&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot;
  -d quote_post_id=&quot;1234567&quot;
```

### Example Response

```
&#123;
  &quot;id&quot;: &quot;1234567&quot; // Threads Media Container ID
&#125;
```

The request above creates a Threads post container that, once [published](https://developers.facebook.com/documentation/threads/posts#step-2--publish-a-threads-media-container), will have a quote reference to the specified post.

## Media Retrieval

All quote posts will be labeled accordingly when retrieved. Make a request to the `GET /threads` or `GET /&#123;threads_media_id&#125;` endpoint to [retrieve media object(s)](https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts/retrieve-posts). Make sure to include the following fields with your API request:

* `is_quote_post` — A boolean field indicating whether a post is a quote post or not.
* `quoted_post` — Media ID of the post that was quoted.

### Example Request

```
curl -s -X GET \
  &quot;https://graph.threads.net/v1.0/&lt;THREADS_MEDIA_ID&gt;?fields=id,is_quote_post,quoted_post&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot;
```

### Example Response

```
&#123;
   &quot;id&quot;: &quot;12312312312123&quot;,
   &quot;is_quote_post&quot;: true,
   &quot;quoted_post&quot;: &#123;
     &quot;id&quot;: &quot;22312312312123&quot;
   &#125;
&#125;
```
</pre></body></html>