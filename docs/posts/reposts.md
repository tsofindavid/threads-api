<html><head><title>Reposts</title><meta charset="UTF-8" /><style nonce="YwCePEvU">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Reposts



You can use the Threads API to repost another post.

## Publishing

You can repost another post when making a request to the `POST /&#123;threads_id&#125;/repost` endpoint. Make sure to include the Threads post ID with your API request:

### Example Request

```
curl -i -X POST \  &quot;https://graph.threads.net/v1.0/&lt;THREADS_POST_ID&gt;/repost?access_token=&lt;ACCESS_TOKEN&gt;&quot;
```

### Example Response

```
&#123;
  &quot;id&quot;: &quot;1234567&quot; // Threads Repost ID
&#125;
```

The request above reposts an original Threads post. Once done, the reposted post will show up under the **Reposts** tab of the user&#039;s Threads profile.

## Media Retrieval

All reposts will have the media type of `REPOST_FACADE` when retrieved. Make a request to the `GET /threads` endpoint to retrieve the reposts. Make sure to include the following fields with your API request:

* `media_type` — A field indicating the type of Threads posts.
* `reposted_post` — Media ID of the post that was reposted.

### Example Request

```
curl -s -X GET \ &quot;https://graph.threads.net/v1.0/&lt;THREADS_MEDIA_ID&gt;?fields=id,media_type,reposted_post&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot;
```

### Example Response

```
&#123;
   &quot;id&quot;: &quot;12312312312123&quot;,
   &quot;media_type&quot;: &quot;REPOST_FACADE&quot;,
   &quot;reposted_post&quot;: &#123;
     &quot;id&quot;: &quot;22312312312123&quot;
   &#125;
&#125;
```
</pre></body></html>