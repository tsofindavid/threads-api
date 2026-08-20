<html><head><title>Location tagging</title><meta charset="UTF-8" /><style nonce="xsQnXJft">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Location Tagging



You can use the Threads API to search for and tag locations when creating media.

### Permissions

The Threads Location Search and Tagging API requires an appropriate access token and permissions. While you are testing, you can easily generate tokens and grant your app permissions by using the Graph API Explorer.

* `threads_basic` — Required for making any calls to all Threads API endpoints.
* `threads_location_tagging` — Required for making GET calls to the location search endpoint and for making POST calls to the publishing endpoints with a location tag.

## Search

You can search for locations by sending a request to the [`GET /location_search` endpoint](https://developers.facebook.com/documentation/threads/reference/location-search). Include the parameter(s) from one of the following options in your request:

* `q` – A query to search for locations by.  
or
* `latitude` – The latitude of a location.
* `longitude` – The longitude of a location.

At least one of the above parameter options must be provided in the request. All three may be used together as well.

**Note:** If your app has not been approved for the `threads_location_tagging` permission, the search will be performed only on the query &quot;Menlo Park&quot;. After approval, all queries will be searchable.

### Example request with query

```
curl -i -X GET \
  &quot;https://graph.threads.net/v1.0/location_search?access_token=&lt;ACCESS_TOKEN&gt;&quot; \
  -d q=&quot;some place&quot;
```

### Example request with     latitude and longitude

```
curl -i -X GET \
  &quot;https://graph.threads.net/v1.0/location_search?access_token=&lt;ACCESS_TOKEN&gt;&quot; \
  -d latitude=12.3456 \
  -d longitude=12.3456
```

### Example response

```
&#123;
  &quot;data&quot;: [
    &#123;
      &quot;id&quot;: 12345,
      &quot;name&quot;: &quot;Facebook Headquarters&quot;,
      &quot;address&quot;: &quot;1 Hacker Way&quot;,
      &quot;city&quot;: &quot;Menlo Park&quot;,
      &quot;country&quot;: &quot;USA&quot;,
      &quot;latitude&quot;: 37.48375115774628,
      &quot;longitude&quot;: -122.14892131843617,
      &quot;postal_code&quot;: &quot;94025&quot;,
    &#125;,
    ...
  ]
&#125;
```

The requests above will return a list of locations based on the search parameters. This response is not paginated.

## Tagging

You can attach a location tag when making a request to the `POST /threads` endpoint to create a media object. Include the following parameter in your request:

* `location_id` – The ID of the location being tagged.

### Example request

```
curl -i -X POST \
  &quot;https://graph.threads.net/v1.0/&lt;THREADS_USER_ID&gt;/threads?media_type=TEXT&amp;text=&lt;TEXT&gt;&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot; \
  -d location_id=12345
```

### Example response

```
&#123;
  &quot;id&quot;: &quot;1234567&quot; // Threads Media Container ID
&#125;
```

The request above creates a Threads post media container that, once [published](https://developers.facebook.com/documentation/threads/posts#step-2--publish-a-threads-media-container), will contain a location tag.

## Media Retrieval

Make a request to the `GET /threads` or `GET /&#123;threads-media-id&#125;` endpoint to retrieve media object(s). Make sure to include the following fields with your API request:

* `location_id` – The ID of the location tagged to the media.
* `location` – The location tagged to the media.

### Example request

```
curl -i -X GET \
  &quot;https://graph.threads.net/v1.0/&lt;THREADS_MEDIA_ID&gt;&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot; \
  -d fields=id,location_id,location&#123;id,address,city,country,name,latitude,longitude,postal_code&#125;
```

### Example response

```
&#123;
  &quot;id&quot;: &quot;12345&quot;, // Threads Media ID
  &quot;location_id&quot;: &quot;12345&quot;, // Location Tag ID
  &quot;location&quot;: &#123; // Location Tag Object
    &quot;id&quot;: &quot;12345&quot;,
    &quot;address&quot;: &quot;1 Hacker Way&quot;,
    &quot;name&quot;: &quot;Facebook Headquarters&quot;,
    &quot;city&quot;: &quot;Menlo Park&quot;,
    &quot;country&quot;: &quot;USA&quot;
    &quot;latitude&quot;: 37.48375115774628,
    &quot;longitude&quot;: -122.14892131843617,
    &quot;postal_code&quot;: &quot;94025&quot;,
  &#125;
&#125;
```

## Location Retrieval

Make a request to the [`GET /&#123;location-id&#125;` endpoint](https://developers.facebook.com/documentation/threads/reference/locations) to retrieve a location object.

### Available Fields

| Name | Description |
| --- | --- |
| `id` | The location&#039;s ID. |
| `address` | Address of the location. |
| `name` | Name of the location. |
| `city` | City of the location. |
| `country` | Country of the location. |
| `latitude` | Latitude of the location. |
| `longitude` | Longitude of the location. |
| `postal_code` | Postal Code of the location. |

### Example request

```
curl -i -X GET \
  &quot;https://graph.threads.net/v1.0/&lt;THREADS_LOCATION_ID&gt;&amp;access_token=&lt;ACCESS_TOKEN&gt;&quot; \
  -d fields=id,address,name,city,country,latitude,longitude,postal_code
```

### Example response

```
&#123;
    &quot;id&quot;: &quot;12345&quot;,
    &quot;address&quot;: &quot;1 Hacker Way&quot;,
    &quot;name&quot;: &quot;Facebook Headquarters&quot;,
    &quot;city&quot;: &quot;Menlo Park&quot;,
    &quot;country&quot;: &quot;USA&quot;
    &quot;latitude&quot;: 37.48375115774628,
    &quot;longitude&quot;: -122.14892131843617,
    &quot;postal_code&quot;: &quot;94025&quot;,
  &#125;
```
</pre></body></html>