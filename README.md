# Cookie Saver

A lightweight browser extension for Chromium-based browsers (Chrome, Chromium, Brave, Edge) that saves all cookies from the current website to a JSON file.

## Features

- Simple one-click cookie export
- Exports cookies in JSON format
- Automatic filename generation with domain and date
- No configuration needed

## Installation

1. Open your Chromium-based browser
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select this project directory
6. The extension icon will appear in your toolbar

## Usage

1. Navigate to any website
2. Click the Cookie Saver extension icon
3. Click "Save Cookies to JSON"
4. The JSON file will download automatically with a filename like `example.com_cookies-2025-11-09.json`

## JSON Format

The exported JSON file contains an array of cookie objects with all standard cookie properties:
- `name`, `value`
- `domain`, `path`
- `secure`, `httpOnly`, `sameSite`
- `expirationDate`, `session`
- `hostOnly`, `storeId`

## Files

- `manifest.json` - Extension configuration
- `popup.html` - Extension popup UI
- `popup.js` - Cookie retrieval and export logic

## License

This project is provided as-is for personal use.
