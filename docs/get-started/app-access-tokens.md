<html><head><title>App Access Tokens</title><meta charset="UTF-8" /><style nonce="3L3IY9UT">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># App Access Tokens



App access tokens are used to make requests to the Threads API on behalf of an app rather than a user. Certain APIs require app access tokens instead of user access tokens, such as the [oEmbed API](https://developers.facebook.com/documentation/threads/tools-and-resources/embed-a-threads-post).

## Generating an app access token

To generate an app access token, you need:

* Your Threads app ID
* Your Threads app secret

### Example request

```html
curl -X GET https://graph.threads.net/oauth/access_token
  ?client_id=&lt;APP_ID&gt;
  &amp;client_secret=&lt;APP_SECRET&gt;
  &amp;grant_type=client_credentials
```

### Example response

```html
&#123;
  &quot;access_token&quot;: &quot;TH|&lt;APP_ID&gt;|&lt;ACCESS_TOKEN&gt;&quot;,
  &quot;token_type&quot;: &quot;bearer&quot;
&#125;
```

This call will return an app access token that can be used in place of a user access token to make API calls as noted above.

**Note:** **Note:** Because this request uses your app secret, it must never be made in client-side code or in an app binary that could be decompiled. It is important that your app secret is never shared with anyone. Therefore, this API call should only be made using server-side code.

## Alternate method

There is another method to make calls to the Threads API on behalf of an app which doesn&#039;t require using a generated app access token. You can just pass your app ID and app secret as the `access_token` parameter when you make a call.

### Example request

```html
curl -X GET https://graph.threads.net/&lt;API_ENDPOINT&gt;
  ?access_tokens=TH|&lt;APP_ID&gt;|&lt;APP_SECRET&gt;&amp;...
```

The choice to use a generated access token or this method depends on where you hide your app secret.
</pre></body></html>