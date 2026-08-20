<html><head><title>Threads Changelog</title><meta charset="UTF-8" /><style nonce="Lz11aa16">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Threads Changelog



## April 21, 2026

- Page-backed Threads accounts are now available for creating Threads ads. See [Page-backed Threads accounts](https://developers.facebook.com/documentation/ads-commerce/marketing-api/ad-creative/threads-ads#page-backed-threads-accounts) for more information.

- Existing Facebook and Instagram posts can be promoted for creating Threads ads. See [Promote Existing Posts as Threads Ads](https://developers.facebook.com/docs/marketing-api/ad-creative/threads-ads/creation/use-posts-as-ads) for more information.

## March 25, 2026

* You can now cross-share a Threads post to the user&#039;s linked Instagram account as a Story. See [Share to Instagram Stories](https://developers.facebook.com/documentation/threads/create-posts/share-to-ig-stories) for more details. **Note:** This feature requires the `threads_share_to_instagram` permission.

- You can now view, hide, and respond to replies on your Threads ads. See [Reply Moderation](https://developers.facebook.com/documentation/ads-commerce/marketing-api/ad-creative/threads-ads/reply-moderation) for more information.

## March 19, 2026

* Additional parameters for creating replies and quote posts have been added to Threads Post Intents. See [Web Intents](https://developers.facebook.com/documentation/threads/threads-web-intents) for more details.

## March 3, 2026

* You can now call Threads oEmbed API without an access token. See [Embed a Threads Post](https://developers.facebook.com/documentation/threads/tools-and-resources/embed-a-threads-post) for more details.

## February 27, 2026

* Support for publishing GIFs with GIPHY has been added.
* Tenor API support will be sunsetted by March 31, 2026.

See [Threads Posts](https://developers.facebook.com/documentation/threads/posts#gifs) for more details.

## February 17, 2026

- App ads are now available for Threads ads. See [Threads App Ads](https://developers.facebook.com/documentation/ads-commerce/marketing-api/ad-creative/threads-ads/creation/app-ads) for more information.

## February 13, 2026

* Support for creating posts with reply approvals and managing pending replies has been added. See [Reply Approvals](https://developers.facebook.com/documentation/threads/reply-management#reply-approvals) for more details.

## January 30, 2026

* Threads profiles without a linked Instagram account can now [access the `followers_count` and `follower_demographics` user metrics](https://developers.facebook.com/documentation/threads/insights#user-metrics).

## January 26, 2026

* Reply and mention webhooks can now return `is_verified` and `profile_picture_url` when applicable. See [Webhooks](https://developers.facebook.com/documentation/threads/webhooks) for more information.

## January 22, 2026

* Additional parameters, including `tag` and `reply_control`, have been added to Threads Post Intents. See [Web Intents](https://developers.facebook.com/documentation/threads/threads-web-intents) for more details.

## January 20, 2026

* Support for filtering keyword or tag search results by author username has been added. See [Keyword and Topic Tag Search](https://developers.facebook.com/documentation/threads/keyword-search) for more details.

## December 22, 2025

* Threads posts with more than 5 links will fail to post with the error `THREADS_API__LINK_LIMIT_EXCEEDED`. [Learn more.](https://developers.facebook.com/documentation/threads/posts)

## December 16, 2025

* The `is_verified` and `profile_picture_url` fields can now be retrieved for replies and mentions. See [Retrieve User Posts](https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts/retrieve-posts), [Retrieve User Replies](https://developers.facebook.com/documentation/threads/retrieve-and-manage-replies/retrieve-replies), and [Retrieve Media Replies and Conversations](https://developers.facebook.com/documentation/threads/retrieve-and-manage-replies/replies-and-conversations) for more information.

## December 15, 2025

* Support for making ghost posts is now available. See [Ghost Posts](https://developers.facebook.com/documentation/threads/create-posts/ghost-posts) for more information.

## December 8, 2025

* Starting December 22, 2025, Threads posts with more than 5 links will fail to post with the error `THREADS_API__LINK_LIMIT_EXCEEDED`. [Learn more.](https://developers.facebook.com/documentation/threads/posts)

## November 20, 2025

* The follower limit for Threads profile discovery has been decreased from 1,000 to 100. See [Retrieve a Threads User&#039;s Public Profile Information](https://developers.facebook.com/documentation/threads/threads-profiles#retrieve-a-threads-user-s-public-profile-information) for more details.

## October 28, 2025

### Threads Ads

- Advantage+ catalog ads are now available for Threads ads. Only images and image carousels are currently supported. Slideshow, video and entry cards are not supported at this time. See [Threads Advantage+ Catalog Ads](https://developers.facebook.com/documentation/ads-commerce/marketing-api/ad-creative/threads-ads/creation/advantage-catalog-ads) for more information.

## October 17, 2025

* Support for adding GIFs to posts is now available. See [GIFs](https://developers.facebook.com/documentation/threads/posts#gifs) for more information.

## October 6, 2025

### Threads Ads

- Image carousel can now be used for Threads ads. Placement customization and dynamic media are not supported. See [Threads Carousel Ads](https://developers.facebook.com/documentation/ads-commerce/marketing-api/ad-creative/threads-ads/creation/carousel-ads) for more information.

## October 3, 2025

* Support for adding spoilers to single or carousel posts containing `TEXT`, `IMAGE`, or `VIDEO` media types is now available. See [Spoilers](https://developers.facebook.com/documentation/threads/create-posts/spoilers) for more information.
* Support for adding a text attachment to a post has been added. See [Text Attachments](https://developers.facebook.com/documentation/threads/create-posts/text-attachments) for more details.

## September 23, 2025

* The Threads API is now available to Threads profiles without a linked Instagram account. These users can use all Threads API functionalities except for the [`followers_count` and `follower_demographics` user metrics](https://developers.facebook.com/documentation/threads/insights).

## September 9, 2025

* Support for searching for public posts by media type has been added. See [Keyword Search](https://developers.facebook.com/documentation/threads/keyword-search#search-by-media-type) for more details.

## August 15, 2025

### Threads Ads

- Threads ads now supports video ads. See [Threads ads creatives: Media requirements](https://developers.facebook.com/documentation/ads-commerce/marketing-api/ad-creative/threads-ads/creation#media-requirements) for more information.

- Threads has been added as a `publisher_platform` in the `customization_spec` for Placement Asset Customization. See [Supported Fields in `customization_spec`](https://developers.facebook.com/documentation/ads-commerce/marketing-api/dynamic-creative/placement-asset-customization#supported-fields) for more information.

### Webhooks

* Support for publish webhooks has been added. See [Webhooks](https://developers.facebook.com/documentation/threads/webhooks) for more details.

## August 12, 2025

* The `total_votes` field was added to poll attachments. See [Polls](https://developers.facebook.com/documentation/threads/create-posts/polls) for more details.

## August 1, 2025

* Support for delete webhooks has been added. See [Webhooks](https://developers.facebook.com/documentation/threads/webhooks) for more details.

## July 21, 2025

* The `topic_tag` field was added to the [Media retrieval endpoints](https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts/retrieve-posts).

## July 15, 2025

* Support for mentions webhooks has been added. See [Webhooks for Threads](https://developers.facebook.com/documentation/threads/webhooks) for more details.

## July 14, 2025

* Support for Threads profile discovery has been added. See [Retrieve a Threads User&#039;s Public Profile Information](https://developers.facebook.com/documentation/threads/threads-profiles#retrieve-a-threads-user-s-public-profile-information) and [Retrieve a List of a Public Profile&#039;s Threads](https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts/retrieve-posts#retrieve-a-list-of-a-public-profile-s-threads) for more details.
* Support for creating posts with topic tags via a `topic_tag` parameter has been added. See [Threads Posts](https://developers.facebook.com/documentation/threads/posts#topic-tags) for more details.
* Support for [Topic Tag Search](https://developers.facebook.com/documentation/threads/keyword-search#topic-tag-search) has been added. The `GET /keyword_search` endpoint also now supports timestamp filtering using the `since` and `until` parameters. See [Keyword Search](https://developers.facebook.com/documentation/threads/keyword-search#keyword-search) for more details.
* Deletion and location search quotas have been added to the `GET me/threads_publishing_limit` endpoint. See [Troubleshooting](https://developers.facebook.com/documentation/threads/troubleshooting#retrieve-quota-limits) for more details.

## July 7, 2025

* The `is_verified` field was added to the [User Profile endpoint](https://developers.facebook.com/documentation/threads/threads-profiles).
* Two new reply audience options, `parent_post_author_only` and `followers_only`, have been added to the [Threads Reply Management API](https://developers.facebook.com/documentation/threads/reply-management#control-who-can-reply).

## July 2, 2025

* The [`clicks` metric](https://developers.facebook.com/documentation/threads/insights#user-metrics) indicating the number of times a URL was clicked on your Threads posts has been added to the [Threads Insights API](https://developers.facebook.com/documentation/threads/insights).

## June 25, 2025

* The query limit for keyword search has been changed. See [Keyword Search](https://developers.facebook.com/documentation/threads/keyword-search) for more details.

## June 6, 2025

* The Threads API can be accessed by either `graph.threads.com` or `graph.threads.net`.

## June 4, 2025

* Support for programmatically debugging access tokens has been added. See [Debug Access Tokens](https://developers.facebook.com/documentation/threads/troubleshooting/debug-access-token) for more details.
* Support for automatically publishing text posts has been added. See [Publishing](https://developers.facebook.com/documentation/threads/reference/publishing) for more details.

## May 27, 2025

* Support for [retrieving Threads location objects by individual ID](https://developers.facebook.com/documentation/threads/reference/locations) has been added.
* Support for [searching for locations to tag in Threads post](https://developers.facebook.com/documentation/threads/reference/location-search) has been added.

See [Location Tagging](https://developers.facebook.com/documentation/threads/create-posts/location-tagging) for more information.  

## April 14, 2025

* Support for creating posts with polls has been added. See [Polls](https://developers.facebook.com/documentation/threads/create-posts/polls) for more details.

## March 6, 2025

* Support for deleting posts has been added. See [Delete Posts](https://developers.facebook.com/documentation/threads/posts/delete-posts) for more details.

## February 13, 2025

* The `gif_url` field was added to the [Media retrieval endpoints](https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts/retrieve-posts).

## December 9, 2024

* Support for [Keyword Search](https://developers.facebook.com/documentation/threads/keyword-search) has been added.
* Return a list of Threads media objects in which a Threads profile has been tagged by another Threads profile. See [Mentions](https://developers.facebook.com/documentation/threads/threads-mentions) for more information.
* Embed the content of Threads posts, such as photos and videos, in other websites. See [Embed a Threads Post](https://developers.facebook.com/documentation/threads/tools-and-resources/embed-a-threads-post) for more information.
* Use the [Threads API Postman Collection](https://developers.facebook.com/documentation/threads/tools-and-resources/postman-collection) to make API calls.

## October 28, 2024

* The [`shares` metric](https://developers.facebook.com/documentation/threads/insights#available-metrics) indicating the number of shares of your Threads posts has been added to the [Threads Insights API](https://developers.facebook.com/documentation/threads/insights).

## October 11, 2024

* A hash sign followed by a whole number (i.e. #1) will not be converted into a tag.
* The list of unsupported special characters in tags has been updated.
* See [Tags](https://developers.facebook.com/documentation/threads/posts#tags) for more details.

## October 9, 2024

* Support for quote posts has been added. See [Quote Posts](https://developers.facebook.com/documentation/threads/posts/quote-posts) for more details.
* Support for reposts has been added. See [Reposts](https://developers.facebook.com/documentation/threads/posts/reposts) for more details.

## October 8, 2024

* Additional fields have been added to the Webhook response. See [Webhooks](https://developers.facebook.com/documentation/threads/webhooks) for more details.

## September 19, 2024

* [Carousel posts](https://developers.facebook.com/documentation/threads/posts#carousel-posts) are now allowed up to 20 images, videos, or a mix of the two.

## September 12, 2024

* We made it easier to attach links with Threads API. See [Links](https://developers.facebook.com/documentation/threads/posts#tags-and-links-in-posts) for more details.

## August 21, 2024

* Support for alt text has been added. See [Accessibility](https://developers.facebook.com/documentation/threads/posts/accessibility) for more details.

## August 15, 2024

* For Threads users who have [enabled sharing to the fediverse](https://help.instagram.com/760878905943039), eligible posts made to Threads via the Threads API will also be shared to the fediverse starting August 28, 2024.

## August 13, 2024

* [Webhooks for Threads](https://developers.facebook.com/documentation/threads/webhooks) allow you to receive real-time notifications for the subscribed topics and fields.

## August 5, 2024

* The `name` field was added to the [User Profile endpoint](https://developers.facebook.com/documentation/threads/reference/user#get---threads-user-id--fields-id-username----).
* Use `graph.threads.net/me/replies` to fetch all replies for your user. See [Retrieve a List of All a User&#039;s Replies](https://developers.facebook.com/documentation/threads/reply-management#retrieve-a-list-of-all-a-user-s-replies) for more information.

## July 23, 2024

* Posts made via the Threads API can be [geo-gated](https://developers.facebook.com/documentation/threads/posts/geo-gating) to one or more specific countries.

## July 12, 2024

* Threads [Web Intents](https://developers.facebook.com/documentation/threads/threads-web-intents) for posts and follows are now available.

## June 25, 2024

* When fetching media insights on reposts, an empty array is returned.

## June 18, 2024

* Threads API is open to all developers, see [blog post](https://developers.facebook.com/blog/post/2024/06/18/the-threads-api-is-finally-here/) for more details.
* Docs have been updated to clarify that the `since` and `until` parameters are not supported when fetching the `followers_count` metric on the `/&#123;threads-user-id&#125;/threads_insights` endpoint.

## June 17, 2024

* Authorization, Permissions, and Threads User Access Tokens sections updated for `threads.net` domain and Threads Tester section added to [Get Started](https://developers.facebook.com/documentation/threads/get-started).
* [Get Access Tokens and Permissions](https://developers.facebook.com/documentation/threads/get-started/get-access-tokens-and-permissions) and [Long-Lived Tokens](https://developers.facebook.com/documentation/threads/get-started/long-lived-tokens) docs added.
* To access the Threads API, create an app and pick the [Threads Use Case](https://developers.facebook.com/documentation/development/create-an-app/threads-use-case).

## June 12, 2024
- With the `threads_basic` and `threads_read_replies` permissions, users can query the `reply_audience` field to see who can reply to their previously published posts.

## June 7, 2024

- The domain for API calls is now `graph.threads.net`. All API calls to `graph.threads.net` should use `v1.0`. In order to use `graph.threads.net`, you will need to obtain a Threads access token.
- Reply Management and Insights have been added to the [Reference](https://developers.facebook.com/documentation/threads/reference) page.

## May 21, 2024

- The `since` and `until` parameters on the user insights endpoint do not work for dates before April 13, 2024 (Unix timestamp 1712991600).
- A Threads profile must have at least 100 followers in order to fetch values for the `follower_demographics` metric.
- When requesting follower demographics, the `breakdown` parameter must be provided and must be set equal to one of the following values: `country`, `city`, `age`, or `gender`.
- Updated the possible values of the `hide_status` field on replies: `NOT_HUSHED`, `UNHUSHED`, `HIDDEN`, `COVERED`, `BLOCKED`, `RESTRICTED`.

## May 15, 2024

- Removed `REPOST_FACADE` as one of the possible values for the `media_type` field on replies.

## May 2, 2024

- Deprecated status code on media builder endpoint.

## May 1, 2024

- Users can query the `is_reply_owned_by_me` field to determine which replies are owned by their user and which replies are owned by other users.

## April 26, 2024

- Launch of User Level Insights.

## April 18, 2024

- The `permalink` and `username` fields can now be fetched on replies made by public users and your own user.

## April 8, 2024

- Threads API documentation was made publicly available. See the [blog post](https://developers.facebook.com/blog/post/2024/04/08/the-threads-api-is-coming-soon) for more details.
</pre></body></html>