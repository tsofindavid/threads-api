<html><head><title>Create Replies</title><meta charset="UTF-8" /><style nonce="odsPtIt0">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Create Replies



### Permissions

To reply to a thread, you must meet one of the following permission requirements:

* You are the owner of the root thread post
* You have either the `threads_keyword_search` or the `threads_manage_mentions` permission.

## Respond to Replies

### Step 1: Use the `reply_to_id` parameter to reply to a specific reply under the root post.

#### Example Request

```
curl -X POST \
  -F &quot;media_type=&lt;MEDIA_TYPE&gt;&quot; \
  -F &quot;text=&lt;TEXT&gt;&quot; \
  -F &quot;reply_to_id=&lt;THREADS_ID&gt;&quot; \
  -F &quot;access_token=&lt;ACCESS_TOKEN&gt;&quot; \
&quot;https://graph.threads.net/v1.0/me/threads&quot;
```

#### Example Response

```
&#123;
 &quot;id&quot;: &quot;1234567890&quot;
&#125;
```

### Step 2: Use the `POST /&#123;threads-user-id&#125;/threads_publish` endpoint to publish the reply container ID returned in the previous step.

It is recommended to wait on average 30 seconds before publishing a Threads media container to give our server enough time to fully process the upload. See the [media container status endpoint](https://developers.facebook.com/documentation/threads/troubleshooting#publishing-does-not-return-a-media-id) for more details.

#### Parameters

* `creation_id` —  Identifier of the Threads media container created from the `/threads` endpoint.

#### Example Request

```curl
curl -i -X POST \
  -F &quot;creation_id=&lt;MEDIA_CONTAINER_ID&gt;&quot; \
  -F &quot;access_token=&lt;ACCESS_TOKEN&gt;&quot; \
&quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads_publish&quot;
```

#### Example Response

```json
&#123;
  &quot;id&quot;: &quot;1234567&quot; // Threads Reply Media ID
&#125;
```
</pre></body></html>