<html><head><title>Spoilers</title><meta charset="UTF-8" /><style nonce="RzLKTSlo">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Spoilers



You can create posts with spoilers using the Threads API. Spoilers can be added to text in a post or can be used with media types like images and videos.

This document covers:

* [Text and Media Spoilers](#text-and-media-spoilers)
* [Single Threads Posts with Spoilers](#single-threads-posts)
* [Carousel Posts with Spoilers](#threads-carousel-posts)

### Limitations

* Media spoilers only work with a `media_type` of `IMAGE`, `VIDEO` or `CAROUSEL`.
* The maximum number of text spoiler entities per post is limited to 10.

## Text and Media Spoilers

### Create a spoiler within a text field

To create a text post with a spoiler, use the `text_entities` parameter. This parameter takes in a list of `entity_type`, `offset`, and `length` values. Each entry represents part of the text post where the spoiler will be applied.

#### Parameters

| Name | Description |
| --- | --- |
| `entity_type`&lt;br&gt;&lt;br&gt;string | Indicates the kind of `entity_type`.&lt;br&gt;&lt;br&gt;**Values:** `SPOILER`, `spoiler` |
| `offset`&lt;br&gt;&lt;br&gt;int | The starting position of the spoiler.&lt;br&gt;&lt;br&gt;**Values:** Positive whole numbers (0, 1, 2, etc.) |
| `length`&lt;br&gt;&lt;br&gt;int | The length of the spoiler text starting from the `offset` position.&lt;br&gt;&lt;br&gt;**Values:** Positive whole numbers (1, 2, etc.) |

### Create a media spoiler

To create a post with spoilers for media objects (i.e., image, video), use the `is_spoiler_media` parameter.

#### Parameters

| Name | Description |
| --- | --- |
| `is_spoiler_media`&lt;br&gt;&lt;br&gt;Boolean | Indicates if the media should be a spoiler or not.&lt;br&gt;&lt;br&gt;**Values:** `true`, `false` |

## Single Threads Posts

### Step 1: Create a media container

Spoilers for single Threads posts need to be provided during the [media container creation phase](https://developers.facebook.com/documentation/threads/posts#step-1--create-a-threads-media-container).

* If a spoiler needs to be added in the text field of the post, use the `text_entities` parameter.
* If a spoiler needs to be added to the media object in the post, use the `is_spoiler_media` parameter.
* If a spoiler needs to be added to the text and media objects in the post, use both the `text_entities` and `is_spoiler_media` parameters.

#### Example requests

##### Spoiler only in the text field

```html
curl -i -X POST \
  -d &quot;access_token=&lt;ACCESS_TOKEN&gt;&quot; \
  -d &quot;media_type=TEXT&quot; \
  -d &quot;text=&lt;TEXT&gt;&quot; \
  -d &quot;text_entities=[
    &#123;
      &quot;entity_type&quot;: &quot;SPOILER&quot;,
      &quot;offset&quot;: 0,
      &quot;length&quot;: 2
    &#125;,
    &#123;
      &quot;entity_type&quot;: &quot;SPOILER&quot;,
      &quot;offset&quot;: 2,
      &quot;length&quot;: 7
    &#125;
  ]&quot; \
&quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads&quot;
```

##### Spoiler only for a media object (image/video)

```html
curl -i -X POST \
  -d &quot;access_token=&lt;ACCESS_TOKEN&gt;&quot; \
  -d &quot;media_type=IMAGE&quot; \
  -d &quot;image_url=&lt;IMAGE_URL&gt;&quot; \
  -d &quot;text=&lt;TEXT&gt;&quot; \
  -d &quot;is_spoiler_media=true&quot; \
&quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads&quot;
```

##### Spoiler for both text and a media object (image/video)

```html
curl -i -X POST \
  -d &quot;access_token=&lt;ACCESS_TOKEN&gt;&quot; \
  -d &quot;media_type=IMAGE&quot; \
  -d &quot;image_url=&lt;IMAGE_URL&gt;&quot; \
  -d &quot;text=&lt;TEXT&gt;&quot; \
  -d &quot;is_spoiler_media=true&quot; \
  -d &quot;text_entities=[
    &#123;
      &quot;entity_type&quot;: &quot;SPOILER&quot;,
      &quot;offset&quot;: 0,
      &quot;length&quot;: 2
    &#125;,
    &#123;
      &quot;entity_type&quot;: &quot;SPOILER&quot;,
      &quot;offset&quot;: 2,
      &quot;length&quot;: 7
    &#125;
  ]&quot; \
&quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads&quot;
```

#### Response

If the API call is successful, the Threads media container ID will be returned.

### Step 2: Publish the media container

You can now [publish](https://developers.facebook.com/documentation/threads/posts#step-2--publish-a-threads-media-container) using the returned Threads media container ID to create your single Threads post with spoilers.

## Threads Carousel Posts

### Step 1: Create a media container

[Create a media container](https://developers.facebook.com/documentation/threads/posts#step-1--create-an-media-container) for each of the items to be included in the carousel.

### Step 2: Create the carousel container

Spoilers for Threads carousel posts need to be provided during the [carousel container creation phase](https://developers.facebook.com/documentation/threads/posts#step-2--create-a-carousel-container).

* If a spoiler needs to be added in the text field of the post, use the `text_entities` parameter.
* If a spoiler needs to be added to the media object in the post, use the `is_spoiler_media` parameter.
* If a spoiler needs to be added to the text and media objects in the post, use both the `text_entities` and `is_spoiler_media` parameters.

**Note:** If `is_spoiler_media` is set to `true` all attached media (i.e., images and videos) will be marked as spoilers.

#### Example requests

##### Spoiler only in the text field

```html
curl -i -X POST \
  -d &quot;access_token=&lt;ACCESS_TOKEN&gt;&quot; \
  -d &quot;media_type=CAROUSEL&quot; \
  -d &quot;children=&lt;MEDIA_ID_1&gt;,&lt;MEDIA_ID_2&gt;,&lt;MEDIA_ID_3&gt;&quot; \
  -d &quot;text=&lt;TEXT&gt;&quot; \
  -d &quot;text_entities=[
    &#123;
      &quot;entity_type&quot;: &quot;SPOILER&quot;,
      &quot;text&quot;: &quot;spoiler&quot;,
      &quot;offset&quot;: 0,
      &quot;length&quot;: 2
    &#125;,
    &#123;
      &quot;entity_type&quot;: &quot;SPOILER&quot;,
      &quot;text&quot;: &quot;spoiler&quot;,
      &quot;offset&quot;: 2,
      &quot;length&quot;: 7
    &#125;
  ]&quot; \
&quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads&quot;
```

##### Spoiler only for a media object (image/video)

```html
curl -i -X POST \
  -d &quot;access_token=&lt;ACCESS_TOKEN&gt;&quot; \
  -d &quot;media_type=CAROUSEL&quot; \
  -d &quot;children=&lt;MEDIA_ID_1&gt;,&lt;MEDIA_ID_2&gt;,&lt;MEDIA_ID_3&gt;&quot; \
  -d &quot;is_spoiler_media=true&quot; \
&quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads&quot;
```

##### Spoiler for both text and a media object (image/video)

```html
curl -i -X POST \
  -d &quot;access_token=&lt;ACCESS_TOKEN&gt;&quot; \
  -d &quot;media_type=CAROUSEL&quot; \
  -d &quot;children=&lt;MEDIA_ID_1&gt;,&lt;MEDIA_ID_2&gt;,&lt;MEDIA_ID_3&gt;&quot; \
  -d &quot;text=&lt;TEXT&gt;&quot; \
  -d &quot;is_spoiler_media=true&quot; \
  -d &quot;text_entities=[
    &#123;
      &quot;entity_type&quot;: &quot;SPOILER&quot;,
      &quot;text&quot;: &quot;spoiler&quot;,
      &quot;offset&quot;: 0,
      &quot;length&quot;: 2
    &#125;,
    &#123;
      &quot;entity_type&quot;: &quot;SPOILER&quot;,
      &quot;text&quot;: &quot;spoiler&quot;,
      &quot;offset&quot;: 2,
      &quot;length&quot;: 7
    &#125;
  ]&quot; \
&quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads&quot;
```

#### Response

If the API call is successful, the Threads media container ID will be returned.

### Step 3: Publish the media container

You can now [publish](https://developers.facebook.com/documentation/threads/posts#step-2--publish-a-threads-media-container) using the returned Threads media container ID to create your Threads carousel post with spoilers.

## Learn More

* [Posts](https://developers.facebook.com/documentation/threads/posts)
* [Retrieve User Posts](https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts/retrieve-posts)
</pre></body></html>