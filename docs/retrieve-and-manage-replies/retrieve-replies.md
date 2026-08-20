<html><head><title>Retrieve User Replies</title><meta charset="UTF-8" /><style nonce="sejvHo1H">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Retrieve User Replies



You can retrieve a list of a user&#039;s replies.

## Retrieve a List of a User&#039;s Replies

Use the `GET /&#123;threads-user-id&#125;/replies` endpoint to return a paginated list of all replies created by a user.

### Fields

Here&#039;s a list of fields that can be returned for each reply.

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
| `reply_audience` | Who can reply to your post.  &lt;br&gt;**Values:** `EVERYONE`, `ACCOUNTS_YOU_FOLLOW`, `MENTIONED_ONLY`, `PARENT_POST_AUTHOR_ONLY`, `FOLLOWERS_ONLY`  &lt;br&gt;**Note:** This only appears on top-level posts and replies that you own. |
| `gif_url` | The URL of the GIF attached to the post (if any).  &lt;br&gt;**Note:** This will only show up on posts that have a GIF attachment. |
| `poll_attachment` | The poll attachment for the post.  &lt;br&gt;**Note:** This will only show up on posts that have a poll. |
| `topic_tag` | The topic tag for the post (if any).  &lt;br&gt;**Note:** This will only show up on posts that have a topic tag. |
| `is_verified` | Returns `true` if the post author&#039;s profile is verified on Threads. |
| `profile_picture_url` | Returns the URL of the post author&#039;s profile picture on Threads. |

#### Example Request

```
curl -s -X GET \
  &quot;https://graph.threads.net/v1.0/me/replies?fields=id,media_product_type,media_type,media_url,permalink,username,text,topic_tag,timestamp,shortcode,thumbnail_url,children,is_quote_post,has_replies,root_post,replied_to,is_reply,is_reply_owned_by_me,reply_audience&amp;since=2023-10-15&amp;until=2023-11-18&amp;limit=1&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot;
```

#### Examples Response

```
&#123;
  &quot;data&quot;: [
    &#123;
      &quot;id&quot;: &quot;1234567&quot;,
      &quot;media_product_type&quot;: &quot;THREADS&quot;,
      &quot;media_type&quot;: &quot;TEXT_POST&quot;,
      &quot;permalink&quot;: &quot;https://www.threads.net/&#064;threadsapitestuser/post/abcdefg&quot;,
      &quot;username&quot;: &quot;threadsapitestuser&quot;,
      &quot;text&quot;: &quot;Reply Text&quot;,
      &quot;topic_tag&quot;: &quot;Reply Topic&quot;,
      &quot;timestamp&quot;: &quot;2023-10-17T05:42:03+0000&quot;,
      &quot;shortcode&quot;: &quot;abcdefg&quot;,
      &quot;is_quote_post&quot;: false,
      &quot;has_replies&quot;: false,
      &quot;root_post&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;replied_to&quot;: &#123;
        &quot;id&quot;: &quot;1234567890&quot;
      &#125;,
      &quot;is_reply&quot;: true,
      &quot;is_reply_owned_by_me&quot;: true,
      &quot;reply_audience&quot;: &quot;EVERYONE&quot;
    &#125;,
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