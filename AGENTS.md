# AGENTS.md

This file provides guidance to AI coding agents working in this repository. Claude Code loads it through the `@AGENTS.md` import in `CLAUDE.md`.

## What this is

Cookie Saver: a Manifest V3 extension for Chromium-based browsers (Chrome, Chromium, Brave, Edge) that exports the cookies for the current tab's URL to a pretty-printed JSON file. Three source files (`manifest.json`, `popup.html`, `popup.js`), no dependencies, no build step.

## Development

There is no build, lint, or test tooling. The extension runs directly from this directory as an unpacked extension.

- Load it: open `chrome://extensions/`, enable Developer mode, click "Load unpacked", select this directory.
- After editing `popup.html` or `popup.js`: close and reopen the popup. The popup document is recreated every time it opens, so no extension reload is needed.
- After editing `manifest.json`: click the reload icon on the extension's card in `chrome://extensions/`.
- To see console output from `popup.js` (it reports failures with `console.error`): right-click the toolbar icon and choose "Inspect popup". The popup's console is separate from the page's DevTools.

## Architecture

Popup-only extension. There is no service worker, no content script, and no persistent state. All logic lives in the click handler in `popup.js` and runs inside the popup document:

1. `chrome.tabs.query({ active: true, lastFocusedWindow: true })` gets the current tab's URL. This needs the `tabs` permission.
2. `chrome.cookies.getAll({ url: tab.url })` returns the cookies that would be sent to that exact URL. This is URL-matched, not domain-matched: cookies scoped to other subdomains or to non-matching paths are excluded. It requires the `cookies` permission plus the `http://*/*` and `https://*/*` host permissions in `manifest.json`.
3. The cookie array is serialized with `JSON.stringify(cookies, null, 2)` and downloaded through a temporary `<a download>` element pointing at a blob URL. The `chrome.downloads` API is not used, so no `downloads` permission is declared.

The download filename is `<host>_cookies-<YYYY-MM-DD>.json`, where host is `tab.url.split('/')[2]` (this includes the port if the URL has one).

Exported objects are Chrome's `cookies.Cookie` objects, unmodified. The README's "JSON Format" section lists the fields.
