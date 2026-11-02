# Navigation Switcher: agent notes

Safari Web Extension (iOS-first) that redirects maps links to the user's default maps app.
Google Maps links → Apple Maps, or Apple Maps links → Google Maps, depending on the setting.
No build step, no dependencies: plain JS, tested with Node's built-in runner.

## Layout

| Path | Role |
| --- | --- |
| `extension/manifest.json` | MV3 manifest. Content script matches Google domains, `maps.app.goo.gl`, `goo.gl/maps`, `maps.apple.com`. |
| `extension/convert.js` | Pure functions `convertGoogleMapsUrl` and `convertAppleMapsUrl`. Return `null` when a link can't be converted. Also loads in the browser as globals (exports guarded by `typeof module`). |
| `extension/content.js` | Runs at `document_start`. Reads `defaultApp` from storage, converts, bumps the counter, `location.replace`s. |
| `extension/background.js` | Service worker. Resolves short links via `fetch` redirect-follow (content scripts can't read cross-origin redirects). |
| `extension/popup.{html,css,js}` | Settings panel: Apple Maps / Google Maps / Off picker with a short explanation, and the conversion counter with fun lines. |
| `test/convert.test.js` | Converter tests. |
| `assets/` | Icon sources: `icon.svg` (square master), `logo.svg` (rounded, for the README), `app-icon-1024.png` (App Store icon, no alpha). `extension/images/icon-*.png` are resized from it. |

## Storage (`browser.storage.local`)

- `defaultApp`: `"apple"`, `"google"` or `"off"`. Unset behaves as `"apple"` (the app ships with Apple Maps as default); content.js and popup.js each apply that default.
- `conversionCount`: total conversions, shown in the popup.

## Commands

    node --test test/        # all converter tests (20 passing at last run)

## Design rules

- The settings live only in the popup. The container app cannot read `browser.storage.local`; sharing settings with it would need an App Group.
- Only convert links pointing at the app the user did *not* pick. This also prevents redirect loops.
- Converters must stay pure and DOM-free so they remain testable in Node. Add a test case for any new URL shape.
- Apple Maps takes one origin and one destination, so intermediate Google waypoints are dropped.
- Links with only a place ID (`cid=`, `ftid=`, `place-id=`) and nothing else return `null` and are left alone.
- Match the existing style: small functions, sparse comments that explain why.

## Status and known gaps

- Converter logic is unit-tested. **The extension has never been run in Safari**: the dev Mac only had Command Line Tools, no Xcode.
- Unverified on device:
  - `maps.app.goo.gl` short-link resolution in `background.js`.
  - Whether Safari opens the Maps app directly from `https://maps.apple.com/...` or shows a web banner. A `maps://` scheme may fix this but can be blocked without a user gesture.
  - Whether iOS hands `maps.apple.com` links to the Maps app before Safari loads them, so the Apple → Google direction never triggers.
- Apple URL parameters `mode` (for `/directions`) and `coordinate`/`name` (for `/place`) were implemented from memory of the share-link format; verify against real shared links.
- Counter increments are read-modify-write, so concurrent tabs can under-count.

## Building for iOS (needs full Xcode)

    xcrun safari-web-extension-converter extension --ios --app-name "Navigation Switcher" --project-location ios

Then set a signing team in Xcode, run on a device, and enable the extension in
Settings → Apps → Safari → Extensions (allow the listed websites).
The generated `ios/` project is not committed yet.
