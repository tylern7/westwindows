# West Windows & Doors – new one-page site: hosting notes

## What the site runs on now
- **WordPress** (self-hosted; WPBakery Page Builder, Gravity Forms, All in One SEO) on a **LiteSpeed** web server.
- **AWS CloudFront** sits in front of it (CDN). DNS is on **AWS Route 53**.
- Email (MX) is with **megamailservers.com**. It's separate from the website, so this change doesn't touch it.
- There is an **existing WordPress `.htaccess`**. **Do not overwrite it.**

This isn't a locked builder like Wix. You can upload plain HTML files next to WordPress.

## What's in the zip
```
westwindows-site/
  index.html      – the whole new homepage
  css/styles.css
  js/main.js
  assets/img/     – optimized photos & logo (~1.9 MB)
  favicon.png
```
All paths are relative, so the folder can live at the web root or in a subfolder.

## Recommended rollout
1. **Preview first.** Upload the contents of `westwindows-site/` into a new folder in the WordPress root, e.g. `/new/`. Check `https://westwindows.on.ca/new/` on a phone and a desktop.
2. **Go live without removing WordPress.**
   - Copy the files into the web root, next to `index.php` and `wp-content/`.
   - Then **merge** the line `DirectoryIndex index.html index.php` from `htaccess-additions.txt` into the top of the existing `.htaccess`. Back it up first.
   - The homepage becomes the new `index.html`.
   - WordPress keeps serving `/blog/` (with its weekly posts), the `/loc/` local pages, `/privacy-policy/`, `/fibercraft/`, `/strassburger/`, `/marvin/`, the video pages and all `wp-content` PDFs.
   - The new page links to those, so **keep WordPress installed**.
3. **Clear caches.**
   - Purge LiteSpeed Cache, if the plugin is active.
   - Create a **CloudFront invalidation** for `/*`, or at least `/` and `/index.html`. Otherwise visitors may see the old homepage for a while.
4. Optional: the redirect lines in `htaccess-additions.txt` are only needed if you unpublish old pages.

**Rollback:** delete `index.html` (or remove the DirectoryIndex line) and invalidate CloudFront.

## The quote form – must be connected before launch
- The live form is **Gravity Forms #1**. Its fields are Name*, Email*, Phone*, Address*, City*, Postal*, "How did you hear about us?" (Google search / Referral / Saw your trucks / Drove by the shop / HomeStars / Other) and Comments*.
- It posts back into WordPress with a security token, so it **can't be reused from a static page**. The new form has the **same fields** and points at a placeholder: `action="https://formspree.io/f/YOUR_FORM_ID"`.
- **Until that is replaced,** pressing Submit opens the visitor's email app with the details addressed to info@westwindows.on.ca. Nothing is lost, but it's clunky.
- Option A (simplest): create a free Formspree form sent to info@westwindows.on.ca, then paste its ID into `index.html`.
- Option B (keep Gravity Forms and its entry history):
  - Make a bare WordPress page containing only the form shortcode `[gravityform id="1" ajax="true"]`.
  - Replace the `<form>` in `index.html` with an `<iframe>` pointing to that page.
- Send yourself one test before launch.

## Links checked (Oct 13, 2026)
- Brochure PDFs (Verre-Select, Trimlite, Novatech, Fusion, Blink, and the 7 wood/smooth door PDFs) all return 200. They are large (8–81 MB) and stay on your server.
- odl.com/catalog, Instagram, both Google Maps links, the Vimeo video and the two Vimeo showcases all return 200.
- Facebook returned 400 to an automated check (login wall). Please confirm it opens in a browser.
- There is no online booking tool. "Free estimate" means the form plus a phone call.

## Things that load from outside this folder
- Google Fonts (Montserrat, Libre Baskerville).
- The Vimeo player, which loads only when someone presses Play.
- PDFs and links to existing pages on westwindows.on.ca. These keep working as long as WordPress stays.
