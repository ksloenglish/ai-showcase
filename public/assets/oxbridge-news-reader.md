# Oxbridge News Reader Website

## What this makes

This prompt helps you create a polished school English news-reader website for your own students. Students pick approved English news sources, read full stories, and study A1–C2 vocabulary highlighted in the text. They can save words in the browser, listen to British English pronunciation, and export a word list. The reader itself never calls an AI model.

It is designed for independent reading on computers, tablets and mobile phones, using British English throughout.

## What you need

- Your school or department name, school logo and preferred colours.
- An A1–C2 vocabulary pack your school is licensed to use (lemma, part of speech, CEFR level, Traditional Chinese gloss, and IPA when available).
- The approved English news sources you want students to read. Use your school’s approved English RSS catalog, or start from the optional public defaults listed in the prompt.
- A short description for the website link when it is shared through WhatsApp or another messaging app.
- A GitHub account if you want to publish the finished site for students on GitHub Pages.
- A way to refresh feeds on a schedule (for example a small server-side or Actions fetch job). The browser must not fetch publisher RSS directly.

## How to use it

1. Prepare the school details, vocabulary pack and feed choices listed above.
2. Open an AI assistant that can create website files, then attach your logo and vocabulary pack if you have them.
3. Copy the whole prompt below. Change only the words in `[SQUARE BRACKETS]`.
4. Send the prompt. Read through and test the website before giving the link to students.

## Copy-and-paste prompt

```text
You are helping me create a browser-based English news-reader website for [SCHOOL OR DEPARTMENT NAME]. The working title is **[SITE TITLE, FOR EXAMPLE Oxbridge News Reader]**. It is for [LEARNER AGE / YEAR GROUP] students who will use it independently on a computer, tablet or mobile phone for school English reading.

### Materials

I have provided:

- School or department name: [SCHOOL OR DEPARTMENT NAME]
- Logo: [ATTACH A LOGO FILE, OR WRITE “USE A TEXT PLACEHOLDER”]
- Brand colours: ink [INK COLOUR, FOR EXAMPLE #111827], paper [PAPER COLOUR, FOR EXAMPLE #f9f6f1], accent [ACCENT COLOUR, FOR EXAMPLE #b45309], school plate for the logo [PLATE COLOUR, FOR EXAMPLE #1054a9 — NOT a CEFR colour]
- Vocabulary pack: [ATTACH A1–C2 VOCABULARY DATA WITH LEMMA, POS, CEFR, TRADITIONAL CHINESE GLOSS, AND IPA WHEN AVAILABLE]
- Feed list: [USE THE SCHOOL’S APPROVED ENGLISH RSS CATALOG / OR THE OPTIONAL PUBLIC DEFAULTS BELOW]
- GitHub Pages repository name and base path: [FOR EXAMPLE oxbridge-news-reader and /oxbridge-news-reader/]
- Link-preview description: [A SHORT DESCRIPTION FOR SHARED LINKS]

Optional public English feed defaults (only if my school allows them; otherwise use the approved catalog above):

- RTHK English — Local: https://rthk.hk/rthk/news/rss/e_expressnews_elocal.xml
- RTHK English — Greater China: https://rthk.hk/rthk/news/rss/e_expressnews_egreaterchina.xml
- RTHK English — World: https://rthk.hk/rthk/news/rss/e_expressnews_einternational.xml
- RTHK English — Finance: https://rthk.hk/rthk/news/rss/e_expressnews_efinance.xml
- RTHK English — Sport: https://rthk.hk/rthk/news/rss/e_expressnews_esport.xml
- news.gov.hk — Top Story: https://www.news.gov.hk/en/common/html/topstories.rss.xml
- news.gov.hk — At School, At Work: https://www.news.gov.hk/en/categories/school_work/html/articlelist.rss.xml
- Radio Free Asia English: https://www.rfa.org/english/rss
- MIT Technology Review: https://www.technologyreview.com/feed

Do not invent feed URLs beyond the approved catalog or these named defaults. Do not put secrets, passwords, personal access tokens or private credentials in the site or in any script comments.

### Task

Create a complete working school news-reader website that can be published as a static GitHub Pages site. Students pick English sources, read stories, and study Oxbridge-style A1–C2 words in the text. The reader must not call any AI model from the browser.

Host article text from a published snapshot file such as `articles.json`. Provide a separate server-side or scheduled fetch job that reads the approved RSS/Atom catalog and writes that snapshot. The browser must load only the published snapshot from the same site origin. It must never fetch publisher RSS feeds directly.

### Requirements

#### 1. Design and brand

1. Use a calm, readable school design suitable for secondary English reading.
2. Use British English spelling and punctuation in all student-facing text.
3. Apply the brand colours above. Put the logo on the school plate colour. The school plate must not be used as a CEFR level colour.
4. Add standard page-title, description and social-sharing metadata. Use the link-preview description provided above.
5. Make the site keyboard accessible, with visible focus states, clear labels and comfortably sized tap targets.

#### 2. Sections

Create three main sections:

1. **News Desk** — source picker, story list and full-text reader.
2. **Word Bank** — words the student saves in this browser.
3. **About** — what the desk does, plus a publisher disclaimer that news belongs to the original sources and does not represent the views of [SCHOOL OR DEPARTMENT NAME].

#### 3. News Desk

1. Provide a source picker. Default to **All RTHK English** (or all five RTHK channels when those feeds are enabled). Also allow individual feeds and other approved groups from the catalog.
2. Show a story list with title, short excerpt, source name and publication time in HKT when available. Leave the time out when the story has no usable date.
3. Opening a story shows the full text, an image when present, publication time in HKT when available, and a link to the original article when a safe URL exists.
4. Provide **Check for updates**, which re-reads the published `articles.json` snapshot without reloading the page. Keep the current source, an open story that is still in the list, the reading position and the Word Bank.
5. Also auto re-read the snapshot about every 15 minutes, and again when the student returns to a background tab after that interval has passed.
6. After a successful check, show a green tick that fades away. If the check fails, show a short written note only. Do not expose public feed-error source lists or failed feed names to students.
7. Under the source picker, show this freshness copy:
   - Always: `Auto-updates through the day.`
   - Then exactly ONE dual-purpose status line, never both:
     - `Feeds checked {time} (HKT).` when reporting the last successful check, or
     - `News updated {time} (HKT).` when reporting that the story list itself changed.
   - Label every student-facing time as HKT. Do not invent times.

#### 4. Vocabulary highlighting and word card

1. Highlight words from the supplied A1–C2 pack by CEFR level, using these colour pairs (text / background):
   - A1: `#166534` / `#dcfce7`
   - A2: `#b45309` / `#ffedd5`
   - B1: `#0e7490` / `#cffafe`
   - B2: `#1d4ed8` / `#dbeafe`
   - C1: `#7e22ce` / `#f3e8ff`
   - C2: `#be123c` / `#ffe4e6`
2. Default highlight levels are B2, C1 and C2. Let the student turn any level on or off at any time. Provide an **All** control that turns every level on, or off when every level is already on.
3. A word with more than one active CEFR level gets a dashed outline instead of a single fill colour.
4. Clicking a highlighted word opens a word card with: CEFR pill, part of speech, Traditional Chinese gloss, IPA in `/.../` when available, and **Listen** using the browser’s speech synthesis with an `en-GB` British voice when the device has one. Do not show an English gloss on the card if the pack already provides Traditional Chinese.
5. The card offers Save to Word Bank, or Remove when that lemma is already saved.
6. After the open story, show a count of highlighted words for each selected CEFR level, then **Word Lists**: one group per selected level that has a match, using the same six CEFR colours. Each chip shows the dictionary lemma and part of speech, for example `disrupt (v)`, not the surface form `disrupting`. Clicking a chip opens the same word card. Provide **Copy** for the listed lines.

#### 5. Word Bank

1. Store saved words in the browser only. Warn students that clearing site data or cache deletes them.
2. Let students filter by CEFR level, open a word, remove one word after confirmation, and delete all after confirmation.
3. Provide CSV export with columns: `word, CEFR, POS, defs`.
4. Levels with no saved words should be visually disabled. Keep highlight chips on News Desk only.

#### 6. Snapshot and feed refresh

1. Keep an approved feed catalog (id, display name, URL, category, enabled).
2. The fetch job reads enabled feeds, writes `articles.json` with timestamps, feed status and articles (id, title, excerpt, fullText, imageUrl, publishedAt, source, sourceFeed, link).
3. If some feeds fail but others succeed, keep previously stored stories for the failed feeds when writing the new snapshot, and still publish stories from the feeds that worked.
4. If every enabled feed fails, leave the existing snapshot unchanged.
5. The browser only fetches the published snapshot from the Pages origin, with a cache-bypass request for Check for updates / auto refresh.

#### 7. Responsive layout

1. On desktop, use a two-column reading layout with a narrower sources/list panel (about 20rem maximum) beside the article.
2. On tablet and phone, use a single column.
3. Below about 960px, hide the story list while a student is reading an open story, and provide a clear way back to the list.

#### 8. Publishing

1. Structure the project so it can be published to GitHub Pages at base path `[BASE PATH, FOR EXAMPLE /oxbridge-news-reader/]`.
2. Explain briefly how to run the feed-refresh job and how to publish updates. Do not include secrets, tokens or private credentials.
3. Persist CEFR highlight choices and Word Bank data in `localStorage`. Reloading may return the news source to the default All RTHK English group and load a fresh snapshot; do not silently reopen the last story after a full reload unless you have a clear student-facing reason.

### Output

Provide a complete website folder ready for GitHub Pages, including:

- the student-facing site files;
- the vocabulary data file(s);
- the feed catalog;
- a starter or empty `articles.json` snapshot shape;
- a fetch script or clear instructions for the scheduled job that writes `articles.json`;
- brief teacher notes on where to change school details, colours, feeds and the vocabulary pack.

If you can publish the site to GitHub Pages, ask for my confirmation before publishing. If you cannot create or host files, provide the complete editable files in separate code blocks and explain how I can save and publish them.

Use British English throughout.

### Check before delivery

Check that:

- the browser never fetches publisher RSS directly and only loads the published article snapshot;
- Check for updates and the ~15-minute / return-to-tab auto refresh re-read the snapshot without wiping the Word Bank;
- freshness shows `Auto-updates through the day.` plus only one of `Feeds checked … (HKT).` or `News updated … (HKT).`, never both;
- failed feed names and public feed-error source lists are not shown to students;
- partial feed failure keeps prior stories for failed feeds when other feeds succeed;
- CEFR colours match the pairs above and the school plate is not used as a CEFR colour;
- the word card shows CEFR, POS, Traditional Chinese gloss, IPA when available, and Listen en-GB;
- Word Lists chips use lemma + POS; Word Bank can filter and export CSV;
- desktop uses a narrower sources panel and screens below ~960px hide the list while reading;
- no secrets or tokens appear in the repository files.

If you cannot create the files, test the website, or publish it, say so clearly before claiming completion. Offer the closest useful alternative. Ask one focused question only if an essential detail is missing. Otherwise, proceed.
```

## Before you use the result with students

- Open the site on a laptop and a mobile phone. Check that stories open, highlighted words show a clear card, and the list hides sensibly while reading on a phone.
- Confirm that Check for updates refreshes the snapshot and that the green tick appears, then fades.
- Check that times are labelled HKT and that students never see a list of failed feed names.
- Add or confirm only feeds your school has approved. Test that a saved word survives a refresh and can be exported as CSV.
- Read the About disclaimer and make sure the school name is correct.

## If your AI assistant cannot make the file you want

Ask for the complete website files as separate code blocks, including the snapshot shape, feed catalog and fetch-job instructions. Save them together in one folder. A colleague with web-publishing experience can then publish that folder through GitHub Pages and set up the scheduled feed refresh.

## What you can change

You can change the school details, logo, colours, site title, year group, approved feed list, link-preview wording, vocabulary pack and GitHub Pages repository name or base path. Keep the no-browser-RSS rule, the published `articles.json` snapshot pattern, the single dual-purpose freshness line, the hidden feed-error rule for students, the CEFR colour pairs, the Word Bank browser-only warning and the responsive reading layout, because these protect the quality and safety of the student experience.

---

## Note for adding this to the AI Resource Showcase

Short brief for adding a **new** showcase item (not an update) on https://ksloenglish.github.io/ai-showcase/:

- **Suggested title:** K S Lo Oxbridge News Reader (or Oxbridge News Reader)
- **Category:** interactive (Interactive & Web-Based Materials)
- **sampleType:** live-site
- **sampleUrl:** https://ksloenglish.github.io/oxbridge-news-reader/
- **outputLabel:** Open live website
- **Suggested tags:** News, Reading, Vocabulary, CEFR, Website
- **Needs:** this Markdown guide + a preview image (preferred) + the live URL
- **Reminder:** new item, not an update
