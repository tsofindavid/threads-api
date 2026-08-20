<html><head><title>Share posts to Instagram Stories</title><meta charset="UTF-8" /><style nonce="4hamcHiP">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Share Posts to Instagram Stories



You can enable cross-sharing of a Threads post as a Story on your linked Instagram account by including the `crossreshare_to_ig` parameter when you create content using any of the Threads [publishing](https://developers.facebook.com/documentation/threads/create-posts) endpoints.

### Limitations

* The user must have a linked Instagram account. If no linked account exists, the cross-share fails but the Threads post is still published.
* Cross-sharing creates an Instagram Story, which expires after 24 hours per standard Instagram Story behavior.

## Permissions

Sharing Threads posts to Instagram Stories requires an appropriate [access token](https://developers.facebook.com/documentation/threads/get-started/get-access-tokens-and-permissions) and permissions. While you are testing, you can generate tokens and grant your app permissions by using the [Graph API Explorer](https://developers.facebook.com/documentation/threads/get-started#graph-api-explorer).

The following permissions are required:

* `threads_basic` — Required for making calls to all Threads API endpoints.
* `threads_share_to_instagram` — Required for cross-sharing the Threads post to the user&#039;s linked Instagram account as a Story.

## Create a cross-shared post

To cross-share a Threads post to Instagram Stories, include either the `crossreshare_to_ig` or `crossreshare_to_ig_dark_mode` parameter set to `true` when creating a Threads media container. You can use these parameters with any supported media type (text, image, video, or carousel).

### Parameters

| Name | Description |
| --- | --- |
| `crossreshare_to_ig`&lt;br&gt;&lt;br&gt;Boolean | Cross-shares a Threads post to a linked Instagram account as a Story when set to `true`.  &lt;br&gt;**Values:** `true`, `false` (*default*) |
| `crossreshare_to_ig_dark_mode`&lt;br&gt;&lt;br&gt;Boolean | Cross-shares a Threads post to a linked Instagram account as a Story in dark mode when set to `true`.  &lt;br&gt;**Values:** `true`, `false` (*default*) |

### Response fields

When cross-sharing is enabled, the publish response includes the `crossreshare_to_ig_status` field:

| Name | Description |
| --- | --- |
| `id`&lt;br&gt;&lt;br&gt;string | The ID of the published Threads media. |
| `crossreshare_to_ig_status`&lt;br&gt;&lt;br&gt;string | The status of the cross-share to Instagram Stories.&lt;br&gt;**Values:** `SUCCESS`, `FAILED`. |

**Note:** The Threads post is published even if the cross-share to Instagram fails. Check the `crossreshare_to_ig_status` field to confirm whether the Story was created successfully.

### Example request

```html
curl -X POST \
  -d &quot;media_type=text&quot; \
  -d &quot;text=&lt;POST_TEXT&gt;&quot; \
  -d &quot;crossreshare_to_ig=true&quot; | &quot;crossreshare_to_ig_dark_mode=true&quot; \
  -d &quot;access_token=&lt;ACCESS_TOKEN&gt;&quot;
&quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads&quot;
```

### Example response

```json
&#123;
  &quot;id&quot;: &quot;&lt;MEDIA_CONTAINER_ID&gt;&quot;,
  &quot;crossreshare_to_ig_status&quot;: &quot;SUCCESS&quot; | &quot;FAILED&quot;
&#125;
```
</pre></body></html>