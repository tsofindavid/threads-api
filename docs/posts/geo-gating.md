<html><head><title>Geo-Gated Content</title><meta charset="UTF-8" /><style nonce="mbNHOgL2">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Geo-Gated Content



You can use the Threads API to create geo-gated content restricted to one or more specific countries. Content marked in this way will only be shown to Threads profiles in those countries.

### Limitations

Only users with access to this feature on threads.net can use this feature via Threads API.

## User Eligibility

A user&#039;s eligibility for the geo-gating feature can be retrieved when making a request to the `GET /me` or `GET /&#123;threads-user-id&#125;` endpoints to [retrieve profile information](https://developers.facebook.com/documentation/threads/threads-profiles#retrieve-a-threads-user-s-profile-information). To retrieve this value, include the following parameter with your API request:

* `is_eligible_for_geo_gating` - A boolean value which represents whether a user is eligible for the geo-gating feature.

### Example Request

```
curl -s -X GET \
  &quot;https://graph.threads.net/v1.0/me?fields=id,is_eligible_for_geo_gating&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot;
```

### Example Response

```
&#123;
   &quot;id&quot;: &quot;12312312312123&quot;,
   &quot;is_eligible_for_geo_gating&quot;: true
&#125;
```

This means that this user has access to the geo-gating feature.

## Publish Geo-Gated Content

Geo-gating can be used when making a request to the `POST /threads` endpoint to [create a media object](https://developers.facebook.com/documentation/threads/posts#step-1--create-a-threads-media-container). To use geo-gating, include the following parameter with your API request:

* `allowlisted_country_codes` - A string list of valid [ISO 3166-1 alpha-2 country codes](https://www.iso.org/obp/ui/#search) that represents the countries where this media should be shown. If this parameter is passed in, the media will not be shown to Threads profiles in countries outside of this list.

### Example Request

```
curl -i -X POST \
  &quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads?media_type=IMAGE&amp;image_url=https://www.example.com/images/bronz-fonz.jpg&amp;text=#BronzFonz&amp;allowlisted_country_codes=US,CA&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot;
```

This request would create a Threads post container that, once published, is only visible in the United States and Canada.

**Note:** The creator of a Threads post is always able to see their content, regardless of geo-gating settings.

## Media Retrieval

Allowlisted country codes for geo-gating can be retrieved when making a request to the `GET /threads` or `GET /&#123;threads_media_id&#125;` endpoint to [retrieve media object(s)](https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts/retrieve-posts). To retrieve the geo-gating allowlist, include the following parameter with your API request:

* `allowlisted_country_codes` - A string list of valid [ISO 3166-1 alpha-2 country codes](https://www.iso.org/obp/ui/#search) that represents the countries where this media is shown.

### Example Request

```
curl -s -X GET \
  &quot;https://graph.threads.net/v1.0/me/threads?fields=id,allowlisted_country_codes&amp;limit=1&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot;
```

### Example Response

```
&#123;
   &quot;id&quot;: &quot;12312312312123&quot;,
   &quot;allowlisted_country_codes&quot;: [
      &quot;US&quot;
   ]
&#125;
```

This means this media is only shown to users in the United States.

## Error Codes

| Error | Description |
| --- | --- |
| `ErrorCode::THREADS_API__FEATURE_NOT_AVAILABLE` | This user does not have access to this Threads API feature. |
| `ErrorCode::THREADS_API__GEO_GATING_INVALID_COUNTRY_CODES` | Some of the specified country code(s) are not supported for geo-gating. |

</pre></body></html>