<html><head><title>Customize a Meta app with the Access the Threads API Use Case</title><meta charset="UTF-8" /><style nonce="btdDUAC3">body { font-family: monospace; margin: 20px; }pre { white-space: pre-wrap; word-wrap: break-word; }</style></head><body><pre data-testid="developer-docs-markdown-page"># Customize a Meta app with the Access the Threads API Use Case


**Warning:** The following content is from the Meta App Development documentation. Please refer to the Development documentation to learn more about the
[Meta App Development process.](https://developers.facebook.com/documentation/development)

This document shows you how to customize the Access the Threads API use case you added to your app during the [app creation process](https://developers.facebook.com/documentation/development/create-an-app).

## Customize use cases

1. If you are not already on the Use cases page of the dashboard, click **Use cases**, or the pencil icon, in the left-side menu.
1. Click on a use case to view the permissions that are available, both required and optional, for this use case.
1. Click the **Add** button to the right of each permission you&#039;d like to add. If, during development, you find that your app doesn&#039;t use the permission, you can return here and remove it.

### Threads API use cases permissions

The following table shows the permissions available for the Threads API use case.
| Permission | Usage | Allowed actions |
| --- | --- | --- |
| [`threads_basic`](https://developers.facebook.com/docs/permissions#threads_basic) | **Required** | **Cannot be removed.** |
| [`threads_content_publish`](https://developers.facebook.com/docs/permissions#threads_content_publish) | Optional. | Can be added or removed. |
| [`threads_delete`](https://developers.facebook.com/docs/permissions#threads_delete) | Optional. | Can be added or removed. |
| [`threads_keyword_search`](https://developers.facebook.com/docs/permissions#threads_keyword_search) | Optional. | Can be added or removed. |
| [`threads_location_tagging`](https://developers.facebook.com/docs/permissions#threads_location_tagging) | Optional. | Can be added or removed. |
| [`threads_manage_insights`](https://developers.facebook.com/docs/permissions#threads_manage_insights) | Optional. | Can be added or removed. |
| [`threads_manage_mentions`](https://developers.facebook.com/docs/permissions#threads_manage_mentions) | Optional. | Can be added or removed. |
| [`threads_manage_replies`](https://developers.facebook.com/docs/permissions#threads_manage_replies) | Optional. | Can be added or removed. |
| [`threads_profile_discovery`](https://developers.facebook.com/docs/permissions#threads_profile_discovery) | Optional. | Can be added or removed. |
| [`threads_read_replies`](https://developers.facebook.com/docs/permissions#threads_read_replies) | Optional. | Can be added or removed. |

You can add and remove permissions at any time during the development process.

###  Settings

1. In the left side menu, click **Settings**. You&#039;ll find your **Threads app ID** and **Threads app secret**.
2. Add the following URLs:
* **Client OAuth Settings** – valid OAuth redirect URIs
* **Deauthorize callback URL** – the URL Meta will ping when a user deauthorizes your app
* **Data Deletion Requests URL** – the URL Meta will ping when someone requests that you delete their data
3. Click **Save**.
4. Click the **Add or Remove Threads Test Users** to add testers to your app. The page will refresh to the **App roles &gt; Roles** page in the dashboard.
5. Click the **Add People** button to add people as to one or more of the following app roles:

* Adminstrator
* Developers
* Testers
* Analytics Users
* Threads Testers

### Webhooks (optional)

A majority of Meta developers use webhooks to get real-time notifications and reduce the number of API calls, and thus reducing the change of rate limiting. Webhooks is automatically added but it is optional.

To receive webhooks from Meta, you need to:

1. [Create an endpoint](docs/graph-api/webhooks/getting-started) on your server to receive and process these HTTP notifications
2. [Send a `POST` request to subscribe your app](docs/graph-api/webhooks/getting-started/webhooks-for-ad-account) to webhooks
3. Configure webhooks in your app&#039;s dashboard (the step listed in this section)

To configure webhooks for your use case in the app&#039;s dashboard, follow these steps. These steps assumes you are in the **Use cases &gt; Customize &gt; Customize use case** dashboard and have selected the **Webhooks** option in the menu.

1. **Select product** - In the dropdown select the assets, such as Page and Ad Account, you&#039;d like to be notified about.
2. Add your **Callback URL**, the endpoint you created to receive webhooks.
3. Add your **Verify token** that Meta will use as part of the callback URL verification.
4. You can add client authentication to the verification process by sliding **Mutual TLS** from No to **Yes**. (Optional)

**Note:** To receive webhook notifications your app must be published.  App Review is not required to use webhooks.

## Testing (Optional)

Testing is only required if you are submitting your app for App Review; if your app will access data you don&#039;t own or manage.

1. Click **Testing** in the left-side menu if you are ready  to test your configuration.

## Publish

**Note:** Some use cases require your app to be published.

### Required app assets

To publish your app, you need the following assets:

* An app icon – Your app&#039;s unique icon image; this file must be less than 5 MB, between 512 x 512 and 1024 x 1024 pixels, and in JPEG, GIF or PNG format.
* Contact information for a Data Protection Officer, if you are doing business in the European Union.
* A [Privacy Policy](https://en.wikipedia.org/wiki/Privacy_policy) URL for your app
* A [data deletion](https://developers.facebook.com/documentation/development/create-an-app/app-dashboard/data-deletion-callback) URL with instructions or a callback that allows your app user to delete their data from your app.

1. When you are ready to publish, select **Publish** in the left side menu.
1. **Review** your use cases and requirements.
1. Click **Publish** in the lower right corner.

**Note:** If you would like to become a Tech Provider click **Become a Tech Provider**.

## For Tech Providers

The following steps must be completed if you&#039;re a Tech Provider, your app will serve clients or other business portfolios.

### App Review

1. Click the chevron next to each requirement listed under **Prepare and submit for App Review**. You must complete each requirement before publishing your app.

A checkmark within a circle appears when each of these requirements has been completed.

Learn more about [App Review](https://developers.facebook.com/documentation/resp-plat-initiatives/individual-processes/app-review).

### Publish your app

1. Click the chevron to the right of **Check that all requirements are met, then publish your app.**
If any requirements have not yet been met, messaging will appear and you will need to satisfy those requirements.
2. Once you have successfully completed all the requirements, click **Publish** in the lower-right corner.

After your app has been published, the **Dashboard** will show **App Health** with **Daily API Calls**.

## See Also

Visit the following to learn more about the app development process:

* [App Review](https://developers.facebook.com/documentation/resp-plat-initiatives/individual-processes/app-review)
* [Business verification](https://developers.facebook.com/documentation/development/release/business-verification)
* [Permissions Reference](https://developers.facebook.com/docs/permissions/threads)
* [Threads API Developer Documentation](https://developers.facebook.com/documentation/threads)

</pre></body></html>