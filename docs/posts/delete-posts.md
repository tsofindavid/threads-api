<html><head><title>Delete Posts</title><meta charset="UTF-8" /><style nonce="0lDI0z1T">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Delete Posts



You can use the Threads API to delete your own posts.

## Deleting

You can delete a Threads post that was created by the authenticated user by making a request to the `DELETE /&#123;threads-media-id&#125;` endpoint with the post&#039;s media object ID. Make sure to include the `access_token` parameter with your API request.

### Permissions

The Threads Delete API requires an appropriate access token and permissions based on the node you are targeting. While you are testing, you can easily generate tokens and grant your app permissions by using the Graph API Explorer.

- `threads_basic` — Required for making any calls to all Threads API endpoints.
- `threads_delete` — Required for making any delete calls.

### Limitations

* The Delete endpoint has a rate limit of 100 deletes per day per account.

### Example Request

```html
curl -i -X DELETE \
  &quot;https://graph.threads.net/v1.0/&lt;THREADS_MEDIA_ID&gt;?access_token=&lt;ACCESS_TOKEN&gt;&quot;
```

### Example Response

```html
&#123;
  &quot;success&quot;: true,
  &quot;deleted_id&quot;: &quot;1234567&quot;,
&#125;
```

The request above deletes a Threads post and returns a response indicating whether the action was successful or not, along with the deleted post&#039;s ID.
</pre></body></html>