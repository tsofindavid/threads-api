<html><head><title>Retrieve and Discover Posts</title><meta charset="UTF-8" /><style nonce="JtfnB6Md">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Retrieve and Discover Posts



You can search for posts using the keyword search or retrieve posts and mentions related to a specific user.

## Pagination

Retrieving a user&#039;s posts and mentions supports cursor-based pagination so the response will include `before` and `after` cursors if the response contains multiple pages of data. Unlike standard cursor-based pagination, however, the response will not include previous or next fields, so you will have to use the `before` and `after` cursors to construct previous and next query strings manually in order to page through the returned data set.

### Example Request

```
curl -s -X GET \
  https://graph.threads.net/17841405822304914/mentions?fields=id,username&amp;access_token=EAADd...
```

### Example Response

```
&#123;
  &quot;data&quot;: [
    &#123;
      &quot;id&quot;: &quot;18038...&quot;,
      &quot;username&quot;: &quot;keldo...&quot;
    &#125;,
    &#123;
      &quot;id&quot;: &quot;17930...&quot;,
      &quot;username&quot;: &quot;ashla...&quot;
    &#125;,
    &#123;
      &quot;id&quot;: &quot;17931...&quot;,
      &quot;username&quot;: &quot;jaypo...&quot;
    &#125;
  ]
&#125;
```

## Next Steps

* [Retrieve Posts](https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts/retrieve-posts)
* [Mentions](https://developers.facebook.com/documentation/threads/threads-mentions)
* [Keyword Search](https://developers.facebook.com/documentation/threads/keyword-search)
</pre></body></html>