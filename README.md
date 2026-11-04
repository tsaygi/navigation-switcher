<p align="center">
  <img src="assets/logo.svg" width="128" alt="Navigation Switcher logo">
</p>

<h1 align="center">Navigation Switcher</h1>

Safari Web Extension that opens maps links in the app you prefer: Google Maps links go to Apple Maps, or the reverse, depending on your setting.

- `extension/convert.js` – Google ⇄ Apple Maps URL conversion (places, coordinates, search, directions)
- `extension/popup.*` – settings panel: default maps app and the conversion counter
- `extension/content.js` – redirects links that point at the non-default app at `document_start`
- `extension/background.js` – resolves `maps.app.goo.gl` short links

## Project structure

| Path | What it is |
| --- | --- |
| `extension/` | The Safari web extension (plain JS, no build step). |
| `ios/Navigation Switcher/` | Xcode project: the container app and the extension target. |
| `ios/.../Navigation Switcher/` | Container app. Shows the step-by-step setup guide (`Resources/Base.lproj/Main.html`, `Resources/Style.css`); `ViewController.swift` handles the Open Settings button. |
| `ios/.../Navigation Switcher Extension/` | Extension target. It references `extension/` directly, so edits there are picked up on the next build. |
| `test/` | Converter tests. |
| `assets/` | Icon sources. |
| `PRIVACY.md` | Privacy policy, linked from the App Store listing. |

## Test

    node --test test/

## Run on iOS (requires full Xcode)

1. Open `ios/Navigation Switcher/Navigation Switcher.xcodeproj`.
2. For both the app and the extension target, set your signing team and a bundle identifier. The extension's identifier must be the app's identifier plus a suffix, for example `com.example.NavigationSwitcher` and `com.example.NavigationSwitcher.Extension`.
3. Run the app scheme on your iPhone. The extension can't be tested in the simulator.
4. Follow the guide shown in the app: Settings → Apps → Safari → Extensions → Navigation Switcher, turn it on and allow the listed websites.

To regenerate the project from scratch (this overwrites the setup guide, so back it up first):

    xcrun safari-web-extension-converter extension --ios-only --swift --app-name "Navigation Switcher" --project-location ios

## License

[MIT](LICENSE)
