# Orvanta (deploy build)

Shipment tracking for orders from China to the Philippines: products with CNY and PHP prices, tracking numbers and eight checkpoint statuses.
Live: https://orvanta.onrender.com/ · Build: 1.5.0

Static site, no framework. `index.html` is plain HTML (prerendered Overview, no inline styles or scripts). `js/dc-lite.js`, a small vanilla-JS renderer, makes it interactive. Generated from `orvanta-v1.5.0.dc.html` by `build/build-deploy.js`; never edit these files by hand. No build step needed to host it.

## Pages
- `index.html`: the app (Overview, Shipments, order pages, Products, Add order, Dashboard, Settings; hash routes such as `#/shipments`)
- `404.html`: not-found page (noindex)

## Files
| Path | What it is |
|---|---|
| `css/app.css` | All styles: base theme tokens, generated component classes, prerender snapshot |
| `js/display.js` | Applies the saved theme and text size before first paint |
| `js/dc-lite.js` | Template renderer (vanilla JS) |
| `js/tpl-index.js` | App template |
| `js/app.js` | App behaviour and sample data |
| `assets/icons/` | Favicon set (`logo_mark_01.svg`, 32 px PNG, Apple touch icon, 192/512 and maskable icons) and the in-app Waypoint marks (`icn_symbol_*`) |
| `assets/og-image.png` | 1200 × 630 share image |
| `favicon.ico` | 16/32/48 px icon for older browsers |
| `robots.txt`, `sitemap.xml`, `site.webmanifest` | Crawling, indexing and install metadata |
| `render.yaml` | Render static-site config: security and cache headers |
| `.gitignore`, `.gitattributes` | Git housekeeping; images marked binary |

## Third-party
Google Fonts (Schibsted Grotesk, IBM Plex Mono), linked from fonts.googleapis.com. No other libraries.

## Data
Orders, products and settings are saved in the visitor's browser (localStorage key `orvanta-v1`). There is no backend in this release.

## Deploy (Render)
1. Delete the old files in the repo first (including `assets/`, `css/`, `js/` and the old `support.js`), then copy this folder in as the repo root.
2. Push with Git or GitHub Desktop (not web drag-and-drop).
3. Render: New, Blueprint, pick the repo (reads `render.yaml`). For an existing service: Manual Deploy, then "Clear build cache & deploy".
4. Hard refresh (Ctrl+Shift+R) and check `<meta name="orvanta-build">` in the page source shows 1.5.0.

If the domain changes, replace `https://orvanta.onrender.com` in `index.html`, `sitemap.xml` and `robots.txt` (or set `DOMAIN` in the build and rebuild).
