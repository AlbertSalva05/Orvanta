# Orvanta v1.4.0: deploy package

Static site for Render. Upload this folder as the publish root (render.yaml sets `staticPublishPath: .`).

## Files
- index.html: the app, with SEO, Open Graph and icon tags in a static head
- support.js: Design Component runtime (cached 1 day)
- favicon.ico: 16, 32 and 48 px for browsers and tools that request /favicon.ico
- site.webmanifest, sitemap.xml, robots.txt
- render.yaml: static service, security headers, cache rules, content types
- assets/og-image.png: 1200 x 630 share image
- assets/logo/: orvanta-favicon.svg (rounded tile), favicon-32.png, apple-touch-icon.png (180, full bleed), icon-192.png, icon-512.png, icon-maskable-512.png (mark inside the 80% safe zone), plus SVG masters: symbol, black, white, reversed, small cut, app icon, maskable, horizontal lockup

## Favicon construction
- Uses the small-size cut of the Waypoint mark (ring stroke 44, diamond 38) so the gap stays open at 16 px.
- Mark is 66% of the tile and shifted 4 units up and right to centre it optically (the open top right makes the geometric centre look low left).
- White ring and amber #e08a3c diamond on harbour teal #1d5c57.

## Before launch
- Domain is set to the Suggested https://orvanta.onrender.com. If Render gives a different URL, replace it in index.html (canonical, og:url, og:image, twitter:image), sitemap.xml and robots.txt.
- The lockup wordmark is live text; outline it before using the lockup in print.
- Data is stored in the visitor's browser (localStorage); there is no backend in this release.
- After launch, run PageSpeed Insights on the live URL.

## Changelog

## v1.4.0 (2026-10-15)
- Add order: each unit price has a PHP or CNY selector and shows the other currency live as you type, plus a line total in both. Removed courier, origin, destination, order reference and estimated delivery; added order date.
- Time tracking: days in the current status and business days (Mon to Fri) since the order date, on Shipments, the order page and Arriving next. Business days stop on the delivery date for delivered orders.
- Manual status updates on each order page: move to the next step in one click, or set any status with date, time and note; mark or clear a delay with a reason. Each change is added to the timeline.
- Edit order (tracking number, order date) and Delete order with confirmation. Settings has Delete all orders and Restore sample data.
- Edit product: shipment field removed; unit price now takes PHP or CNY.
- Converter page removed (conversion now happens inline on Add order and Edit product).
- Bulk delete on Shipments and in Settings: Delete all shipments (keeps products as not shipped yet) and Delete all orders (removes shipments and products). Both ask first.
- Icons throughout: section headings, overview and order cards, a stage icon for each of the 8 checkpoints (timeline, shipments list, Arriving next, recent activity), and action buttons.
- Removed "Where your shipments are now" from the overview; Arriving next stays. Dashboard carriers card removed.

## v1.3.0 (2026-10-15)
- New Converter page (Manage > Converter, #/convert): peso to yuan and back, swap button, quick amounts, quick-reference table, and a trial rate you can save as the rate for all prices.
- Favicons redrawn: heavier small-size cut of the mark, optically centred on the tile, smaller inside the maskable safe zone; separate full-bleed app icon for Apple and Android.

## v1.2.0 (2026-10-15)
- Overview pipeline is now interactive: checkpoints grouped into four phases (In China, Crossing, PH customs, Last mile), each count labelled "shipments", empty checkpoints muted. Select one to list its parcels; default list shows what arrives next.
- Six flat totals replaced by three cards (spend, items, shipments) with a clear main number, context line and next action. Currency values no longer break mid-number.
- Back to top is now a floating button built from the Waypoint mark: the ring fills as you scroll and the amber diamond travels round it. It appears after you scroll, lifts on hover, and the arrow launches when pressed. Focus returns to the page content.
- "Add shipment" renamed "Add order" everywhere. Standalone "Add product" buttons removed; products are added with their order and can still be edited.
- Sidebar is fixed on the left on desktop and can be hidden or shown (choice is remembered). Content now uses the full width, removing the empty band on the right.
- Light and dark mode: quick toggle in the header, plus Light / Dark / High contrast in Settings. Dark mode uses a reversed logo.
- Responsive pass: layouts now switch on the space actually available (screen width minus sidebar, adjusted for text size), so tables, the checkpoint pipeline and charts never squeeze or overflow. Tables scroll inside their card as a last resort; week bars turn into rows on phones; sidebar uses top/bottom anchoring for mobile browser bars; safe-area spacing for the back-to-top button; form fields stack cleanly on narrow screens.
- New "Where your shipments are now" layout: four step cards (In China, Crossing, PH customs, Last mile) on a drawn route line, each with its count and selectable checkpoints, ending in a Delivered card; summary badges on top. Vertical timeline on smaller screens. The Arriving next list is unchanged.

## v1.1.0 (2026-10-15)
- Removed the Resale stock workspace and the workspace switcher.
- Sidebar on every screen size: grouped Track / Manage sections, icons, live counts, delayed-shipment card, sync status. On phones it opens as a drawer over the page (backdrop, Escape closes).
- Page headers with eyebrow, title and description on every page; app footer with rate, time zone and links.
- New interactive Dashboard: period (30 / 90 days / all) and currency toggles, KPI cards with badges, spend-by-week bars, status mix, days per leg, carriers. Select a week or status to filter the shipments in view.
- Motion: staggered page entry, counting numbers, growing bars, checkpoint diamonds dropping into place, card hover lift. All motion is switched off for reduced-motion users.

## v1.0.0 (2026-10-15)
- Logo: direction 1a Waypoint chosen. Kit in `logo/` (colour, black, white, small cut, favicon, horizontal lockup with live-text wordmark).
- App `orvanta-v1.0.0.dc.html`: overview, shipments (search, filter, sort, pagination), shipment details with 8-checkpoint timeline, products (CNY/PHP per line), add shipment, add/edit product dialog, settings, 404.
- Two workspaces (Personal orders with sample data, Resale stock empty).
- Accessibility: high-contrast theme, three text sizes, 44px targets, visible focus, status shown with text plus colour.
- System states via the `dataState` tweak: loading, empty, error with retry, offline with stale data.
- Suggested: sample rate 1 CNY = 7.95 PHP (editable). Palette harbour teal #1d5c57 + signal amber #c96a1b; Schibsted Grotesk + IBM Plex Mono (both SIL OFL).
- Later releases: reports, notifications, integrations, application management, authentication.
