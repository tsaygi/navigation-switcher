# App Store Connect listing: Navigation Switcher

Copy each block into the field named in its heading. Character limits are Apple's.
Items marked `TODO` need your own value before submission.

## App Information

**Name** (max 30)

```
Navigation Switcher
```

**Subtitle** (max 30)

```
Open map links in your app
```

**Primary category:** Navigation
**Secondary category:** Utilities
**Price:** Free (no in-app purchases)
**Age rating:** 4+ (answer "None" to every question)
**Copyright**

```
2026 TODO: your name
```

## Version Information

**Promotional Text** (max 170, editable without a new release)

```
Friends send Google Maps links, you use Apple Maps? Or the other way round? Pick your default and links open where you want. Free, no ads, no tracking.
```

**Description** (max 4000)

```
Your friends send you a Google Maps link. You use Apple Maps. Or you use Google Maps and someone sends you an Apple Maps link. Either way, the link opens in the wrong app.

Navigation Switcher is a Safari extension that fixes this. Apple Maps is the default and you can change it in a tap. Links from the other app are converted automatically, so the place, address, coordinates or directions open in the app you actually use.

WHY I BUILT THIS
I switched from Google Maps to Apple Maps, but most of my friends still use Google Maps and keep sending me links. Every time, I had to copy the address and paste it into Apple Maps by hand. The apps that solve this problem were all paid, so I built my own to fix it for myself. Then I decided to make it available to everyone: free, with no ads and no tracking, and that will stay the case.

HOW IT WORKS
1. Open the app and follow the steps to turn on the extension in Safari settings.
2. Apple Maps is the default. To change it, tap the Navigation Switcher button in Safari and choose Google Maps, or Off to pause.
3. Tap any maps link. If it points at the other app, it is converted and opened in yours.

WHAT IT CONVERTS
• Places, with their name and exact location
• Raw coordinates
• Address and keyword searches
• Directions, including the start, the destination and the travel mode (driving, walking or transit)
• Google Maps short links (maps.app.goo.gl)

A FUN COUNTER
The settings panel shows how many links Navigation Switcher has converted for you. The count is stored only on your device.

PRIVATE BY DESIGN
• No ads
• No tracking and no analytics
• No account
• Your settings and counter never leave your device
• Free, with no in-app purchases

GOOD TO KNOW
• The extension needs permission to run on the Google Maps and Apple Maps websites. It only reads the link of those pages in order to convert it.
• Apple Maps allows one start and one destination, so extra stops in a multi-stop Google Maps route are dropped.
• Links that contain only an internal place ID and no address or coordinates cannot be converted and open as usual.
• Short links are resolved by contacting Google, the same as opening the link normally.

Navigation Switcher is an independent app and is not affiliated with, endorsed by or sponsored by Google or Apple. Google Maps is a trademark of Google LLC. Apple Maps is a trademark of Apple Inc.
```

**Keywords** (max 100, comma-separated, no spaces)

```
maps,links,redirect,safari,extension,navigation,directions,address,convert,switch,location,share
```

**What's New in This Version**

```
First release. Choose your default maps app and open links from the other app where you want them.
```

**Support URL:** `TODO` (a page or repository issues URL where people can reach you)
**Marketing URL:** optional, `TODO`
**Privacy Policy URL:** `TODO` (required; text to publish is below)

## App Privacy (the "nutrition label")

Answer **Data Not Collected**. The app has no analytics, no third-party SDKs and no server of its own. The settings and counter are stored locally with the extension.

## Privacy Policy text

Publish this at the Privacy Policy URL.

```
Privacy Policy for Navigation Switcher

Navigation Switcher does not collect, store on a server, share or sell any personal data. It has no ads, no analytics and no tracking.

The app saves two things on your device only: your default maps app and a count of converted links. They never leave your device.

To convert a link, the extension reads the address of Google Maps and Apple Maps pages you open in Safari. This happens locally. For Google Maps short links (maps.app.goo.gl), the extension contacts Google to find the full link, the same request your browser makes when you open the link.

Contact: TODO
Last updated: 2026-11-02
```

## App Review Information

**Sign-in required:** No

**Notes for the reviewer**

```
Navigation Switcher is a Safari Web Extension. It has no account and no backend.

To test:
1. Settings > Apps > Safari > Extensions > Navigation Switcher: turn it on and allow the listed websites.
2. In Safari, tap the aA (or puzzle piece) menu > Navigation Switcher. Apple Maps is already the default; the panel can also switch to Google Maps or Off.
3. Open this link in Safari: https://www.google.com/maps/place/Tokyo+Tower/@35.6585,139.7454,17z
   It should redirect to Apple Maps for Tokyo Tower.
4. Choose "Google Maps" as the default, then open: https://maps.apple.com/?q=Tokyo+Tower&ll=35.6586,139.7455
   It should redirect to Google Maps.
5. The panel shows the number of conversions, stored only on the device.

The extension reads only the URL of Google Maps and Apple Maps pages to convert it. It collects no data.
```

**Contact:** TODO (first name, last name, phone, email)

## Screenshots

Required: one set for the 6.9" iPhone display (1320 x 2868); smaller sizes are scaled from it. Suggested set:

1. The settings panel with a default selected and the counter showing
2. A Google Maps link in a chat or Notes, before tapping
3. The same place opened in Apple Maps after tapping
4. The Safari Extensions settings screen with the extension on
5. The reverse direction: an Apple Maps link opening in Google Maps

Suggested captions: "Pick your default once", "Friends send Google Maps links", "They open in Apple Maps", "Turn it on in Safari", "Works the other way too".

## Before you submit

- The extension has not been run on a device yet. Test both directions with real shared links, and check that Safari opens the Maps app (or its web page) as expected, before you describe the result in screenshots.
- The app needs an icon (1024 x 1024) and the container app needs a simple screen explaining how to turn the extension on. Apple rejects apps whose container app does nothing.
- The review notes assume the toolbar menu works as described on your iOS version; adjust step 2 if the label differs.
