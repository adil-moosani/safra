# Afiyah landing page

## Files
- `index.html` — page content and copy
- `styles.css` — all styling (colors, fonts, light and dark mode)
- `script.js` — reserve buttons, waitlist form, analytics events
- `images/` — hero, favicon, and where new photos go

## Adding photos
Save photos into `images/` with these names, then find the matching comment in `index.html` and add the `<img>` tag inside its frame:
- `ingredient-black-seed.webp`, `ingredient-ginger.webp`, `ingredient-saffron.webp`
- `ritual.webp` (replaces the illustrated breakfast scene)
- `founder-1.webp`, `founder-2.webp`

WebP at around 1200px wide keeps the page fast. JPG works too.

## Deploying to Netlify
1. Go to app.netlify.com/drop and drag the whole `afiyah-site` folder onto the page.
2. In the new site, open the Forms settings and make sure form detection is enabled, then redeploy (drag the folder again) so Netlify picks up the waitlist form.
3. Submit a test email on the live site. It should appear under Forms → waitlist, along with the plan and price the person chose.

Opened locally (double-clicking `index.html`), the form runs in demo mode and doesn't send anything.

## Analytics
Every step pushes an event to `window.dataLayer`: `page_view`, `cta_scroll`, `reserve_click` (plan, price), `waitlist_submit`, `waitlist_dismiss`. Add a Google Tag Manager or GA4 snippet to the `<head>` of `index.html` to collect them.
