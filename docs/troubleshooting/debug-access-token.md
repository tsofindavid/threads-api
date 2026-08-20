<html><head><title>Debug Access Token</title><meta charset="UTF-8" /><style nonce="fej2aVQJ">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Debug Access Token



The `/debug_token` endpoint returns metadata about a given access token. This includes data such as the user for which the token was issued, whether the token is still valid, when it expires, and what permissions the app has for the given user.

To access this endpoint, it is required to provide a user access token from a [Threads tester](https://developers.facebook.com/documentation/threads/get-started#threads-testers), and this access token must be associated with the same app that is linked to the `input_token` being inspected.

## Retrieve an Access Token&#039;s Data

### Example Request

```html
curl -i -X GET \
  &quot;https://graph.threads.net/v1.0/debug_token?access_token=&lt;THREADS_TESTER_ACCESS_TOKEN&gt;&amp;input_token=&lt;ACCESS_TOKEN_TO_BE_INSPECTED&gt;&quot;
```

### Parameters

| Name | Description |
| --- | --- |
| `access_token`&lt;br&gt;&lt;br&gt;string | **Required.**  &lt;br&gt;Threads Graph API user access token of a Threads tester. |
| `input_token`&lt;br&gt;&lt;br&gt;string | **Required.**  &lt;br&gt;The access token to be inspected. |

**Note:** The `access_token` and `input_token` can be associated with different users but must be associated with the same app.

### Example Response

```html
&#123;
  &quot;data&quot;: &#123;
    &quot;type&quot;: &quot;USER&quot;,
    &quot;application&quot;: &quot;Threads API Test App&quot;,
    &quot;data_access_expires_at&quot;: 1754846089,
    &quot;expires_at&quot;: 1752254132,
    &quot;is_valid&quot;: true,
    &quot;issued_at&quot;: 1747070132,
    &quot;scopes&quot;: [
      &quot;threads_basic&quot;,
      &quot;threads_content_publish&quot;,
      &quot;threads_manage_replies&quot;,
      &quot;threads_manage_insights&quot;,
      &quot;threads_read_replies&quot;,
      &quot;threads_manage_mentions&quot;,
      &quot;threads_keyword_search&quot;,
      &quot;threads_location_tagging&quot;
    ],
    &quot;user_id&quot;: &quot;1234567890123456&quot;
  &#125;
&#125;
```

### Fields

| Name | Description |
| --- | --- |
| `data`&lt;br&gt;&lt;br&gt;object | Data wrapper around the result. |
| `type`&lt;br&gt;&lt;br&gt;string | Whether the access token is an app access token or user access token. |
| `application`&lt;br&gt;&lt;br&gt;string | Name of the application this access token is for. |
| `data_access_expires_at`&lt;br&gt;&lt;br&gt;Unixtime | Timestamp when the app&#039;s access to user data expires. |
| `expires_at`&lt;br&gt;&lt;br&gt;Unixtime | Timestamp when this access token expires. |
| `is_valid`&lt;br&gt;&lt;br&gt;Boolean | Whether the access token is still valid or not. |
| `issued_at`&lt;br&gt;&lt;br&gt;Unixtime | Timestamp when this access token was issued. |
| `scopes`&lt;br&gt;&lt;br&gt;string[] | List of permissions that the user has granted for the app in this access token. |
| `user_id`&lt;br&gt;&lt;br&gt;string | The ID of the user this access token is for. |

</pre></body></html>