<html><head><title>Create Posts</title><meta charset="UTF-8" /><style nonce="OuraABRI">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Create Posts



You can use the Threads API to publish image, video, text, or carousel posts as well as quote and repost other posts.

## Permissions

Posting to Threads requires an appropriate access token and permissions based on the node you are targeting. While you are testing, you can easily generate tokens and grant your app permissions by using the Graph API Explorer.

- `threads_basic` — Required for making any calls to all Threads API endpoints.
- `threads_content_publish` — Required for Threads publishing endpoints only.

If your app has not been approved for advanced access for the `threads_content_publish` permission, you can only post to Threads for your account and your app&#039;s tester accounts. After approval, you can post to Threads on behalf of other public users.

## Fediverse

For Threads users who have [enabled sharing to the fediverse](https://help.instagram.com/760878905943039), eligible posts made to Threads via the Threads API will also be shared to the fediverse starting August 28, 2024.

## Next Steps

* [Threads Posts](https://developers.facebook.com/documentation/threads/posts)
* [Reposts](https://developers.facebook.com/documentation/threads/posts/reposts)
* [Quote Posts](https://developers.facebook.com/documentation/threads/posts/quote-posts)
* [Spoilers](https://developers.facebook.com/documentation/threads/create-posts/spoilers)
* [Text Attachments](https://developers.facebook.com/documentation/threads/create-posts/text-attachments)
* [Geo-Gated Content](https://developers.facebook.com/documentation/threads/posts/geo-gating)
* [Accessibility](https://developers.facebook.com/documentation/threads/posts/accessibility)
</pre></body></html>