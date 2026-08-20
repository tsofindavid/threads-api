<html><head><title>Retrieve Media Replies and Conversations</title><meta charset="UTF-8" /><style nonce="hrMp7vSC">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Retrieve Media Replies and Conversations



There are two ways of retrieving a thread&#039;s replies: `GET &#123;media-id&#125;/replies` and `GET &#123;media-id&#125;/conversation`.

`GET &#123;media-id&#125;/replies` only returns the top-level replies under the Threads ID provided in the request, while `GET &#123;media-id&#125;/conversation` returns all replies, regardless of the depth, either in chronological or reverse chronological order.

### Parameters
These parameters are for both `GET &#123;media-id&#125;/replies` and `GET &#123;media-id&#125;/conversation`.

| Name | Description |
| --- | --- |
| `reverse` | `true` if replies should be sorted in reverse chronological order. `false` if replies should be sorted in chronological order.  &lt;br&gt;**Default:** `true` |

### Fields
These fields are for both `GET &#123;media-id&#125;/replies` and `GET &#123;media-id&#125;/conversation`.

| Name | Description |
| --- | --- |
| `id` *(default)* | The media&#039;s ID. |
| `text` | Represents text for a Threads reply. This is optional on image, video, and carousel replies. |
| `username` | Threads username who created the post.  &lt;br&gt;**Note:** This only works for public users and your own user. |
| `permalink` | Permanent link to the post. Will be omitted if the media contains copyrighted material or has been flagged for a copyright violation.  &lt;br&gt;**Note:** This only works for public users and your own user. |
| `timestamp` | The publish date and time of the post in ISO 8601 format. |
| `media_product_type` | Surface where the media is published. In the case of Threads, the value is `THREADS`. |
| `media_type` | The media type for a Threads reply will be one of these values: `TEXT_POST`, `IMAGE`, `VIDEO`, `CAROUSEL_ALBUM`, or `AUDIO`. |
| `media_url` | The post’s media URL. This only shows for image, video, and carousel replies. |
| `shortcode` | Shortcode of the media. |
| `thumbnail_url` | URL of thumbnail. This only shows for Threads replies with video. |
| `children` | List of child posts. This only shows for carousel replies. |
| `is_quote_post` | Indicates if the media is a quoted reply made by another user. |
| `quoted_post` | Media ID of the post that was quoted.  &lt;br&gt;**Note**: This only appears on quote posts. |
| `has_replies` | `true` if the Threads post or reply has replies that you can see. |
| `root_post` | Media ID of the top-level post or original thread in the reply tree.  &lt;br&gt;**Note:** This only appears on replies. |
| `replied_to` | Media ID of the immediate parent of the reply.  &lt;br&gt;**Note:** This only appears on replies. |
| `is_reply` | `true` if the Threads media is a reply. `false` if the Threads media is a top-level post. |
| `is_reply_owned_by_me` | `true` if your user is the owner of the Threads reply. `false` if another user is the owner of the Threads reply.  &lt;br&gt;**Note:** This only appears on replies. |
| `hide_status` | Whether or not the reply is hidden.  &lt;br&gt;**Values:** `NOT_HUSHED`, `UNHUSHED`, `HIDDEN`, `COVERED`, `BLOCKED`, `RESTRICTED`  &lt;br&gt;**Note:** This only appears on replies. |
| `reply_audience` | Who can reply to your post.  &lt;br&gt;**Values:** `EVERYONE`, `ACCOUNTS_YOU_FOLLOW`, `MENTIONED_ONLY`, `PARENT_POST_AUTHOR_ONLY`, `FOLLOWERS_ONLY`  &lt;br&gt;**Note:** This only appears on top-level posts and replies that you own. |
| `gif_url` | The URL of the GIF attached to the post (if any).  &lt;br&gt;**Note:** This will only show up on posts that have a GIF attachment. |
| `poll_attachment` | The poll attachment for the post.  &lt;br&gt;**Note:** This will only show up on posts that have a poll. |
| `topic_tag` | The topic tag for the post (if any).  &lt;br&gt;**Note:** This will only show up on posts that have a topic tag. |
| `is_verified` | Returns `true` if the post author&#039;s profile is verified on Threads.  &lt;br&gt;**Note:** Only available on direct replies. |
| `profile_picture_url` | Returns the URL of the post author&#039;s profile picture on Threads.  &lt;br&gt;**Note:** Only available on direct replies. |

## A Thread&#039;s Replies

Use `&#123;media-id&#125;/replies` to fetch a paginated list of all top-level replies.

This endpoint is applicable to the use cases that focus on the depth level of the replies. The endpoint returns the immediate replies of the requested Threads ID. `has_replies` indicates whether a Thread has nested replies or not and the field can be used to decide to chain further subsequent GET calls to retrieve replies located in the deeper levels.

#### Example Request

```
curl -s -X GET \
  &quot;https://graph.threads.net/v1.0/&lt;MEDIA_ID&gt;/replies?fields=id,text,topic_tag,timestamp,media_product_type,media_type,media_url,shortcode,thumbnail_url,children,has_replies,root_post,replied_to,is_reply,hide_status&amp;reverse=false&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot;
```

#### Example Response

```
&#123;
  &quot;data&quot;: [
    &#123;
      &quot;id&quot;: &quot;1234567890&quot;,
      &quot;text&quot;: &quot;First Reply&quot;,
      &quot;topic_tag&quot;: &quot;First Topic&quot;,
      &quot;timestamp&quot;: &quot;2024-01-01T18:20:00+0000&quot;,
      &quot;media_product_type&quot;: &quot;THREADS&quot;,
      &quot;media_type&quot;: &quot;TEXT_POST&quot;,
      &quot;shortcode&quot;: &quot;abcdefg&quot;,
      &quot;has_replies&quot;: true,
      &quot;root_post&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;replied_to&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;is_reply&quot;: true,
      &quot;hide_status&quot;: &quot;NOT_HUSHED&quot;
    &#125;,
    &#123;
      &quot;id&quot;: &quot;1234567890&quot;,
      &quot;text&quot;: &quot;Second Reply&quot;,
      &quot;topic_tag&quot;: &quot;Second Topic&quot;,
      &quot;timestamp&quot;: &quot;2024-01-01T18:20:00+0000&quot;,
      &quot;media_product_type&quot;: &quot;THREADS&quot;,
      &quot;media_type&quot;: &quot;TEXT_POST&quot;,
      &quot;shortcode&quot;: &quot;abcdefg&quot;,
      &quot;has_replies&quot;: false,
      &quot;root_post&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;replied_to&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;is_reply&quot;: true,
      &quot;hide_status&quot;: &quot;HIDDEN&quot;
    &#125;,
    &#123;
      &quot;id&quot;: &quot;1234567890&quot;,
      &quot;text&quot;: &quot;Third Reply&quot;,
      &quot;topic_tag&quot;: &quot;Third Topic&quot;,
      &quot;timestamp&quot;: &quot;2024-01-01T18:20:00+0000&quot;,
      &quot;media_product_type&quot;: &quot;THREADS&quot;,
      &quot;media_type&quot;: &quot;TEXT_POST&quot;,
      &quot;shortcode&quot;: &quot;abcdefg&quot;,
      &quot;has_replies&quot;: false,
      &quot;root_post&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;replied_to&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;is_reply&quot;: true,
      &quot;hide_status&quot;: &quot;UNHUSHED&quot;
    &#125;
  ],
  &quot;paging&quot;: &#123;
    &quot;cursors&quot;: &#123;
      &quot;before&quot;: &quot;BEFORE_CURSOR&quot;,
      &quot;after&quot;: &quot;AFTER_CURSOR&quot;
    &#125;
  &#125;
&#125;
```

## A Thread&#039;s Conversations

Use `&#123;media-id&#125;/conversation` to fetch a paginated and flattened list of all top-level and nested replies.

This endpoint is applicable to specific use cases that do not focus on the knowledge of the depthness of the replies. **Note:** This endpoint is only intended to be used on the root-level threads with replies.

#### Example Request

```
curl -s -X GET \
  &quot;https://graph.threads.net/v1.0/&lt;MEDIA_ID&gt;/conversation?fields=id,text,timestamp,media_product_type,media_type,media_url,shortcode,thumbnail_url,children,has_replies,root_post,replied_to,is_reply,hide_status&amp;reverse=false&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot;
```

#### Example Response

```
&#123;
  &quot;data&quot;: [
    &#123;
      &quot;id&quot;: &quot;1234567890&quot;,
      &quot;text&quot;: &quot;First Reply&quot;,
      &quot;topic_tag&quot;: &quot;First Topic&quot;,
      &quot;timestamp&quot;: &quot;2024-01-01T18:20:00+0000&quot;,
      &quot;media_product_type&quot;: &quot;THREADS&quot;,
      &quot;media_type&quot;: &quot;TEXT_POST&quot;,
      &quot;shortcode&quot;: &quot;abcdefg&quot;,
      &quot;has_replies&quot;: true,
      &quot;root_post&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;replied_to&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;is_reply&quot;: true,
      &quot;hide_status&quot;: &quot;NOT_HUSHED&quot;
    &#125;,
    &#123;
      &quot;id&quot;: &quot;1234567890&quot;,
      &quot;text&quot;: &quot;Second Reply&quot;,
      &quot;topic_tag&quot;: &quot;Second Topic&quot;,
      &quot;timestamp&quot;: &quot;2024-01-01T18:20:00+0000&quot;,
      &quot;media_product_type&quot;: &quot;THREADS&quot;,
      &quot;media_type&quot;: &quot;TEXT_POST&quot;,
      &quot;shortcode&quot;: &quot;abcdefg&quot;,
      &quot;has_replies&quot;: false,
      &quot;root_post&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;replied_to&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;is_reply&quot;: true,
      &quot;hide_status&quot;: &quot;HIDDEN&quot;
    &#125;,
    &#123;
      &quot;id&quot;: &quot;1234567890&quot;,
      &quot;text&quot;: &quot;Third Reply&quot;,
      &quot;topic_tag&quot;: &quot;Third Topic&quot;,
      &quot;timestamp&quot;: &quot;2024-01-01T18:20:00+0000&quot;,
      &quot;media_product_type&quot;: &quot;THREADS&quot;,
      &quot;media_type&quot;: &quot;TEXT_POST&quot;,
      &quot;shortcode&quot;: &quot;abcdefg&quot;,
      &quot;has_replies&quot;: false,
      &quot;root_post&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;replied_to&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;is_reply&quot;: true,
      &quot;hide_status&quot;: &quot;UNHUSHED&quot;
    &#125;,
    &#123;
      &quot;id&quot;: &quot;1234567890&quot;,
      &quot;text&quot;: &quot;Nested Reply&quot;,
      &quot;topic_tag&quot;: &quot;Nested Topic&quot;,
      &quot;timestamp&quot;: &quot;2024-01-01T18:20:00+0000&quot;,
      &quot;media_product_type&quot;: &quot;THREADS&quot;,
      &quot;media_type&quot;: &quot;TEXT_POST&quot;,
      &quot;shortcode&quot;: &quot;abcdefg&quot;,
      &quot;has_replies&quot;: false,
      &quot;root_post&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;replied_to&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;is_reply&quot;: true,
      &quot;hide_status&quot;: &quot;NOT_HUSHED&quot;
    &#125;
  ],
  &quot;paging&quot;: &#123;
    &quot;cursors&quot;: &#123;
      &quot;before&quot;: &quot;BEFORE_CURSOR&quot;,
      &quot;after&quot;: &quot;AFTER_CURSOR&quot;
    &#125;
  &#125;
&#125;
```
</pre></body></html>