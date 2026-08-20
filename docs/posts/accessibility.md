<html><head><title>Accessibility</title><meta charset="UTF-8" /><style nonce="ZwRaaMVI">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Accessibility



To aid users who are visually impaired, you can use Threads API to set the accessibility label or alt text for each image or video that is attached to your post.

### Limitations

This feature isn&#039;t available for text-only posts. It will only work on image, video, and carousel posts.

## Publishing

Alt text can be configured when making a request to the `POST /threads` endpoint to [create a media object](https://developers.facebook.com/documentation/threads/posts#step-1--create-a-threads-media-container). Make sure to include the following parameter with your API request:

* `alt_text` — (For images and videos only.) The accessibility text label or description for an image or video in a Threads post.

### Example Request

```
curl -i -X POST \
  &quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads?media_type=IMAGE&amp;image_url=https://www.example.com/images/bronz-fonz.jpg&amp;text=BronzFonz&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot;
  -d alt_text=&quot;Photograph of Bronze Fonz Statue&quot;
```

### Example Response

```
&#123;
  &quot;id&quot;: &quot;1234567&quot; // Threads Media Container ID
&#125;
```

The request above creates a Threads post container that, [once published](https://developers.facebook.com/documentation/threads/posts#step-2--publish-a-threads-media-container), will add a custom accessibility label to your media.

## Media Retrieval

The value for alt text can be retrieved when making a request to the `GET /threads` or `GET /&#123;threads_media_id&#125;` endpoint to retrieve media object(s). Make sure to include the following field with your API request:

* `alt_text` — The accessibility text label or description for an image or video in a Threads post.

### Example Request

```
curl -s -X GET \
  &quot;https://graph.threads.net/v1.0/&lt;THREADS_MEDIA_ID&gt;?fields=id,alt_text&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot;
```

### Example Response

```
&#123;
   &quot;id&quot;: &quot;12312312312123&quot;,
   &quot;alt_text&quot;: &quot;Photograph of Bronze Fonz Statue&quot;,
&#125;
```
</pre></body></html>