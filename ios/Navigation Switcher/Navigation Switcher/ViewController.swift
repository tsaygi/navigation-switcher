//
//  ViewController.swift
//  Navigation Switcher
//
//  Created by Tolga Saygi on 2026/11/04.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate, WKScriptMessageHandler {

    @IBOutlet var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        self.webView.navigationDelegate = self

        self.webView.configuration.userContentController.add(self, name: "controller")

        self.webView.loadFileURL(Bundle.main.url(forResource: "Main", withExtension: "html")!, allowingReadAccessTo: Bundle.main.resourceURL!)
    }

    // The guide's "Open Settings" button is a custom-scheme link, so no JS is needed.
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        if navigationAction.request.url?.scheme == "navswitcher" {
            openSafariSettings()
            decisionHandler(.cancel)
            return
        }
        decisionHandler(.allow)
    }

    // There is no public API for Safari's settings page. The App-Prefs scheme is undocumented
    // (it may change between iOS releases, and App Review can reject it), so the candidates
    // are tried in order and the documented app-settings URL is the last resort.
    // The guide covers the rest of the path from wherever Settings lands.
    private func openSafariSettings() {
        let candidates = [
            "App-Prefs:com.apple.mobilesafari",  // iOS 18+
            "App-Prefs:root=SAFARI",             // iOS 17 and earlier
            UIApplication.openSettingsURLString,
        ]
        open(candidates.compactMap(URL.init))
    }

    private func open(_ urls: [URL]) {
        guard let url = urls.first else { return }
        UIApplication.shared.open(url) { opened in
            if !opened {
                self.open(Array(urls.dropFirst()))
            }
        }
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        // Override point for customization.
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        // Override point for customization.
    }

}
