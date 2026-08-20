<html><head><title>Polls</title><meta charset="UTF-8" /><style nonce="ffIuf8SP">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Polls



You can use the Threads API to create posts with polls.

### Limitations

* Polls can only be attached to text-only posts.

## Create a post with a poll

You can attach a poll when making a request to the `POST /threads` endpoint to create a media object. Include the following parameter in your request:

* `poll_attachment` – A JSON object containing the options for the poll.

The `poll_attachment` object must be of the form:

```
&#123;
  &quot;option_a&quot;: &quot;first option&quot;,
  &quot;option_b&quot;: &quot;second option&quot;,
  &quot;option_c&quot;: &quot;third option&quot;, // Optional
  &quot;option_d&quot;: &quot;fourth option&quot; // Optional
&#125;
```

The `poll_attachment` object must contain at least 2 options and no more than 4 options. The length of each option you include must be at least 1 character long and at most 25 characters long.

### Example request

```
curl -i -X POST \
&quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads?media_type=TEXT&amp;text=MyText&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot; \
-d poll_attachment=&#039;&#123;&quot;option_a&quot;:&quot;first option&quot;, &quot;option_b&quot;:&quot;second option&quot;&#125;&#039;
```

### Example response

```
&#123;
  &quot;id&quot;: &quot;1234567&quot; // Threads Media Container ID
&#125;
```

The request above creates a Threads post container that, once [published](https://developers.facebook.com/documentation/threads/posts#step-2--publish-a-threads-media-container), will contain a poll attachment with the provided options.

## Media retrieval

Make a request to the `GET /threads` or `GET /&#123;threads-media-id&#125;` endpoint to retrieve media object(s). Make sure to include the following field with your API request:

* `poll_attachment` – The poll attachment for the post.

### Example request

```
curl -i -X GET \
&quot;https://graph.threads.net/v1.0/&lt;THREADS_MEDIA_ID&gt;&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot; \
-d fields=id,poll_attachment&#123;option_a,option_b,option_c,option_d,option_a_votes_percentage,option_b_votes_percentage,option_c_votes_percentage,option_d_votes_percentage,total_votes,expiration_timestamp&#125;
```

### Example response

```
&#123;
  &quot;id&quot;: &quot;1234567&quot;, // Threads Media ID
  &quot;poll_attachment&quot;: &#123;
    &quot;option_a&quot;: &quot;first option&quot;,
    &quot;option_b&quot;: &quot;second option&quot;,
    &quot;option_c&quot;: &quot;third option&quot;,
    &quot;option_d&quot;: &quot;fourth option&quot;,
    &quot;option_a_votes_percentage&quot;: 0.10, // Percentage of votes for first option
    &quot;option_b_votes_percentage&quot;: 0.20,
    &quot;option_c_votes_percentage&quot;: 0.15,
    &quot;option_d_votes_percentage&quot;: 0.55,
    &quot;total_votes&quot;: 100,
    &quot;expiration_timestamp&quot;: &quot;2025-01-01T23:00:00+0000&quot; // Time when the poll expires
  &#125;
&#125;
```

**Note:** The fields for option C and option D will only be returned if available for the poll being retrieved.
</pre></body></html>