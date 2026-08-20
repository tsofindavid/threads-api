<html><head><title>Text Attachments</title><meta charset="UTF-8" /><style nonce="Ev3LgXOT">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Text Attachments



You can create posts with text attachments using the Threads API. Text attachments allow you to share long-form writing in a post or a reply with up to 10,000 characters and a link. They can also include emojis and style formatting.

### Limitations

* Text attachments can only be attached to text-only posts.
* Text attachments cannot be attached to a post that has a poll.
* If there is already a [link attachment](https://developers.facebook.com/documentation/threads/posts#links) in the main post, a link attachment cannot be added in the text attachment.
* The number of links is restricted to 5 or less.

**Warning:** Starting December 22, 2025, Threads posts containing more than 5 links will fail to post during the media creation step (`POST /&#123;threads-user-id&#125;/threads`) with the error code: `THREADS_API__LINK_LIMIT_EXCEEDED`.

How links are counted:

* All unique URLs found in the `text` field are counted as links.
* If the `link_attachment_url` field under the `text_attachment` field contains a URL that is different from all URLs in the `text` field, it is counted as an additional link.
* If the `link_attachment_url` field under the `text_attachment` field is the same as any URL in the `text` field, it is only counted once, rather than twice.

Examples:

* If the `text` field contains only www.facebook.com, and the `link_attachment_url` is also www.facebook.com, this counts as 1 link.
* If the `text` field contains www.instagram.com and www.threads.com, and the `link_attachment_url` is www.facebook.com, this counts as 3 links.
* If the `text` field contains www.example.com, www.example.com, and www.test.com, and the `link_attachment_url` is www.test.com, this counts as 2 links (www.example.com and www.test.com are each counted once).

If you receive this error, reduce the number of unique links in your post to 5 or less.

## Create a Post with a Text Attachment

### Step 1: Create a Threads media container

You can add a text attachment to a post by making a request to the `POST /&#123;threads-user-id&#125;/threads` endpoint to create a media container with the `text_attachment` JSON object.

#### Parameters

| Name | Description |
| --- | --- |
| `plaintext`&lt;br&gt;&lt;br&gt;string | **Required.**  &lt;br&gt;The text of the text attachment with a maximum of 10K characters. |
| `link_attachment_url`&lt;br&gt;&lt;br&gt;URL | **Optional.**  &lt;br&gt;The URL of a link to include in the text attachment. |
| `text_with_styling_info`&lt;br&gt;&lt;br&gt;string | **Optional.**  &lt;br&gt;The styling info be applied to the text and where it should appear.&lt;br&gt;&lt;br&gt;**Values:** `offset`, `length`, `styling_info`&lt;br&gt;&lt;br&gt;**Note:** The text styling info ranges within the `text_with_styling_info` field should not overlap.&lt;br&gt;&lt;br&gt;Available text styles:&lt;br&gt;&lt;br&gt;* Bold&lt;br&gt;* Italic&lt;br&gt;* Highlight&lt;br&gt;* Underline&lt;br&gt;* Strikethrough |

#### Example request

```html
curl -i -X POST \
  -d &quot;media_type=TEXT&quot; \
  -d &quot;text=&lt;TEXT&gt;&quot; \
  -d &quot;access_token=&lt;ACCESS_TOKEN&gt;&quot; \
  -d &quot;text_attachment=
    &#123;
      &quot;plaintext&quot;: &quot;Lengthy plain text for the text attachment.&quot;,
      &quot;link_attachment_url&quot;: &quot;&lt;LINK_URL&gt;&quot;,
      &quot;text_with_styling_info&quot;:[
        &#123;
          &quot;offset&quot;: 0,
          &quot;length&quot;: 7,
          &quot;styling_info&quot;:[&quot;bold&quot;,&quot;italic&quot;]
        &#125;,
        &#123;
          &quot;offset&quot;: 7,
          &quot;length&quot;: 10,
          &quot;styling_info&quot;:[&quot;highlight&quot;]
        &#125;]
    &#125;&quot; \
&quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads&quot;
```

#### Example response

```json
&#123;
  &quot;id&quot;: &quot;&lt;THREADS_MEDIA_CONTAINER_ID&gt;&quot;
&#125;
```

### Step 2: Publish the media container

You can [publish](https://developers.facebook.com/documentation/threads/posts#step-2--publish-a-threads-media-container) using the returned Threads media container ID to create your Threads post with a text attachment.

## Retrieve Posts with Text Attachments

Make a request to the `GET /&#123;threads-user-id&#125;/threads` or `GET /&#123;threads-media-id&#125;` endpoint  with the `text_attachment` field to retrieve any media object(s) with text attachments.

### Parameters

| Name | Description |
| --- | --- |
| `text_attachment` | The text attachment for the post. |

### Example request

```html
curl -i -X GET \
  -d &quot;access_token=&lt;ACCESS_TOKEN&gt;&quot; \
  -d &quot;fields=id,text_attachment&quot; \
&quot;https://graph.threads.net/v1.0/&lt;THREADS_MEDIA_ID&gt;
```

### Example response

```json
&#123;
  &quot;id&quot;: &quot;&lt;THREADS_MEDIA_ID&gt;&quot;,
  &quot;text_attachment&quot;: &#123;
    &quot;plaintext&quot;: &quot;Lengthy plaintext for the text attachment.&quot;,
    &quot;link_attachment_url&quot;: &quot;&lt;LINK_URL&gt;&quot;,
    &quot;text_with_styling_info&quot;: [
      &#123;
        &quot;offset&quot;: 0,
        &quot;length&quot;: 7,
        &quot;styling_info&quot;:[&quot;bold&quot;,&quot;italic&quot;]
      &#125;,
      &#123;
        &quot;offset&quot;: 7,
        &quot;length&quot;: 10,
        &quot;styling_info&quot;:[&quot;highlight&quot;]
      &#125;]
  &#125;
&#125;
```

## Learn More

* [Posts](https://developers.facebook.com/documentation/threads/posts)
* [Retrieve User Posts](https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts/retrieve-posts)
</pre></body></html>