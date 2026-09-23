# Grammar Challenge Website

## What this makes

This prompt helps you create a polished grammar-practice website for your own students. It includes random question runs, automatic marking, a timer, a final score and a full answer review, while leaving all exercise content for you to add later.

It is designed for independent practice on computers, tablets and mobile phones, using British English throughout.

## What you need

- Your school name, school logo and preferred colours.
- The year group, term names and grammar topics you want to offer.
- A short description for the website link when it is shared through WhatsApp or another messaging app.
- Your own grammar questions, passages, answer keys and explanations. You can add these after the website structure has been created.
- A GitHub account if you want to publish the finished site for students.

## How to use it

1. Prepare the school details listed above. You do not need to prepare exercises before the first build.
2. Open an AI assistant that can create website files, then attach your logo if you have one.
3. Copy the whole prompt below. Change only the words in `[SQUARE BRACKETS]`.
4. Send the prompt. Read through and test the website before adding your own questions.

## Copy-and-paste prompt

```text
You are helping me create a browser-based grammar-practice website for [SCHOOL OR DEPARTMENT NAME]. The working title is **[YEAR GROUP] Grammar Challenge**. It is for [LEARNER AGE / YEAR GROUP] students who will use it independently on a computer, tablet or mobile phone.

### Materials

I have provided:

- School or department name: [SCHOOL OR DEPARTMENT NAME]
- Logo: [ATTACH A LOGO FILE, OR WRITE “USE A TEXT PLACEHOLDER”]
- Main colours: [COLOUR 1], [COLOUR 2], [OPTIONAL ACCENT COLOUR]
- Terms to show: [FOR EXAMPLE, FIRST TERM AND SECOND TERM]
- Grammar topics to show: [TOPIC 1], [TOPIC 2], [TOPIC 3], [TOPIC 4]
- Link-preview description: [A SHORT DESCRIPTION FOR SHARED LINKS]

Do not create real grammar questions, passages, answer keys or explanations yet. I will add my own content later.

### Task

Create a complete working grammar-practice website that can be published as a static GitHub Pages site. Use only vanilla HTML, CSS and JavaScript. Do not use a framework, database, build process or server.

Create these separate files:

- `index.html` for page structure, website metadata and the screen layout.
- `style.css` for all styling, including desktop, tablet, mobile and dark-mode styles.
- `app.js` for interaction, randomisation, marking, timer, answer review and moving between screens.
- `data.js` for all editable terms, topics, questions and passages.

Keep all editable content in `data.js`. Add clear, valid placeholder topic objects and comments showing exactly where I will add my own questions and passages. Do not mix question content into the website logic.

### Requirements

#### 1. Design and accessibility

1. Create a friendly, modern and game-inspired design that is still suitable for school.
2. Use the school logo, title and a dark-mode toggle in a sticky top bar that stays visible while a student works.
3. Use British English spelling and punctuation in all student-facing text.
4. Make the site keyboard accessible, with visible focus states, clear labels and comfortably sized tap targets.
5. You may use subtle floating decorative particles in the background, but every particle must remain completely visible inside its background area at every screen width and throughout any animation.
6. Do not show a streak counter on the home screen. Use a simple score display instead.

#### 2. Home screen

Create the following sections in this order:

1. A top bar with logo, site title and dark-mode control.
2. A term selector. A term with no exercises must be visibly disabled and cannot be selected.
3. Topic cards under a heading such as “Choose Your Quest”. Each card needs an icon, a title and a short description. The topic-card order must follow the order of topics in `data.js`.
4. A soft-tinted information bar below the topic heading saying that questions will be different each time.
5. A question-count selector with 10, 20, 30, 40 and 50 questions for question-bank activities. Do not show it for a whole-passage activity. Do not allow a run to exceed 50 questions or include repeats.
6. A clear Start button. It must remain disabled until the student has made the required selections.
7. A footer with copyright text and a small version number, beginning with Version 1.

#### 3. Shared exercise features

Every activity must show:

- Current question number and total, such as “Q 4 / 20”.
- A timer that starts on the first question and uses `mm:ss.ss` format.
- A score that updates immediately when marks are earned.
- A Quit button that returns safely to the home screen.
- Clear feedback after a student checks an answer.
- A Finish button at the end of a run.

At the end of a run, show final marks, percentage where appropriate, time taken, a short encouraging message and a detailed answer review. The answer review must include the full correct sentence or completed passage. Also show the full correct answer immediately after the student checks each activity. Include a Play Again button.

For question-bank activities, choose questions randomly with no duplicates within the same run. If a topic does not contain enough questions for the selected run length, prevent that choice or clearly cap it.

#### 4. Data structure and activity types

Use one clear top-level data object in `data.js`, organised by term and topic. Every topic must include a label, icon, short description, activity type, student instruction and an empty questions or exercises list.

Support these reusable activity types:

| Activity type | What it does |
|---|---|
| `mc` | A standard multiple-choice question bank. |
| `passage` | A complete passage with several grammar blanks. One whole passage is chosen at random per play. |
| `builder` | A three-step tap-based sentence builder, for example for relative clauses. |
| `builder-rs` | A three-step tap-based reported-speech builder. |

Use clearly labelled example field names and empty arrays only. Do not invent real exercise content.

#### 5. Standard multiple choice

For `mc` activities, show one question at a time and shuffle the options. Award a mark only if the correct option is chosen on the first attempt. If a wrong option is selected, mark it as wrong but let the student try again. Do not award the mark after an earlier wrong attempt. Show Next only after the correct option has been chosen, and call it Finish on the final question.

#### 6. Passage activities

Create a passage renderer that supports plain text interspersed with blank objects. Each passage must have a title, and one entire passage must be chosen randomly each time the activity starts.

Support both of these kinds of passage blank:

1. **Select-based grammar blanks.** Each blank must contain one correct answer, exactly three distinct distractors, an optional prompt cue and a brief explanation for the answer review. Shuffle the four choices when the passage opens.
2. **Article-selection blanks.** Support `a`, `an`, `the` and `no article`. In the answer review, make it clear that a no-article answer means no article is needed.

For a passive-voice or verb-form blank, make distractors useful for learning. Do not repeat the correct answer or repeat a distractor. Where suitable, contrast the correct passive form with a past participle alone, an incorrect auxiliary-plus-base-verb form and an active form. For active answers, include plausible passive and incorrect active alternatives. For negative and modal passive forms, make the distractors target the missing auxiliary or incorrect verb form.

If you later add a passage activity that uses typed text answers, every answer box must be the same fixed width. Make it wide enough for the longest accepted answer. Never make individual answer boxes match their answers in length, because box length gives students a clue. This fixed-width rule does not apply to select-based blanks.

#### 7. Three-step sentence builder

Create a tap-based three-step activity for grammar tasks such as combining two sentences with a relative clause:

1. The student chooses the correct grammar word, such as a relative pronoun.
2. The student taps word tiles in order to build the clause.
3. The student taps the place where the clause belongs in the first sentence.

Award one mark for each step. Do not require typing.

A used word tile must be completely inactive in the word bank: it must not respond to taps, hover effects or press effects. The student may remove a chosen word only by tapping it in the assembled-answer area.

For the sentence-placement step, let sentence text wrap naturally word by word on small screens. Keep only the final word before a placement button joined to the placement button. Do not force an entire long sentence fragment to stay on one line. Make the space before and after each placement button visually equal, including before a final full stop.

Check the word-tile order without treating upper- and lower-case letters as different. Show the complete correct combined sentence immediately after checking and again in the final answer review.

#### 8. Three-step reported-speech builder

Create a separate three-step, tap-based reported-speech activity:

1. Choose the reporting verb or reporting frame.
2. Build the reported clause by tapping word tiles in order.
3. Choose the correct time expression, when the question needs one.

Support both statements and commands. For commands, accept the correct to-infinitive structure. For statements, accept an opening `that` both with and without it. Allow declared alternatives where grammar makes more than one answer acceptable, such as a past simple or past perfect alternative.

If there is no time-expression change, hide Step 3 and make the question worth two marks instead of three.

For every word that changes inside the reported clause, put the original word in the Step 2 word bank as a distractor. This includes subject pronouns, object pronouns, possessives, demonstratives and place words. For example, if `our` changes to `their`, include `our` as a distractor; if `here` changes to `there`, include `here` as a distractor. Keep helpful verb-form distractors too, such as an original modal or tense form.

Test time-expression changes in Step 3, not in the Step 2 clause bank. For example, put originals such as `now`, `today`, `tomorrow` and `next week` among the Step 3 wrong time-expression choices when appropriate.

Used tiles must be inactive in the word bank and removable only from the assembled answer. The full correct reported sentence must appear immediately after checking and in the final answer review.

#### 9. Mobile layout

Make the website responsive on desktop, tablet and mobile phone.

On screens 600 pixels wide or narrower, make the two builder activities more compact without changing desktop sizing. Reduce the vertical padding and gaps in the reporting-frame or grammar chips, word tiles, assembled tokens, instruction boxes, source boxes, section spacing and activity-card padding. Keep enough horizontal padding and space between controls for comfortable tapping.

As a starting point, use approximately `7px 16px` padding for mobile chips, `6px 13px` for word tiles, `5px 11px` for assembled tokens and `7px` gaps. Test the actual phone layout and adjust carefully if needed. The student should be able to see more of the question and choices without excessive scrolling.

#### 10. Version numbers, shared-link text and publishing

Add a cache version to the CSS and JavaScript links in `index.html`, for example `?v=1`, and show the same Version 1 in the footer.

For every future change to the website, update both version numbers together:

1. Increase the cache version in the CSS and JavaScript file links.
2. Change the footer version to the same number.
3. If publishing to GitHub Pages, commit and push the new version, then confirm that the published branch is up to date.

Add standard page-title, description and social-sharing metadata. Use the link-preview description provided above for the social-sharing description. Explain that messaging apps can cache an old preview and a temporary extra query in the shared link may be needed after a description change.

### Output

Provide a complete folder containing `index.html`, `style.css`, `app.js` and `data.js`, with valid empty placeholders that let me add my own content later. Briefly explain where I should add school details, terms, topics, questions, passage answers, distractors and explanations.

If you can publish the site to GitHub Pages, ask for my confirmation before publishing. If you cannot create or host files, provide the four complete editable files in separate code blocks and explain how I can save them.

Use British English throughout.

### Check before delivery

Check that:

- All four files load without HTML, CSS or JavaScript errors.
- All four activity types can open with a safe empty-state message or placeholder content.
- Question selection cannot repeat a question in a single run.
- The first-attempt rule for multiple choice is applied correctly.
- The builder activities use tap-based tiles rather than typing.
- Used tiles are inactive in the word bank and removable only in the assembled-answer area.
- Sentence placement wraps naturally and placement buttons have equal visual space on both sides.
- The reported-speech builder accepts optional `that`, all declared alternatives and two-mark questions without Step 3.
- Each select-based blank has exactly one correct answer and three different distractors.
- The mobile builder layout is more compact, while desktop styling is unchanged.
- No decorative particle, text, card, button or footer is clipped or overlaps another element.
- The cache version in the file links exactly matches the version shown in the footer.

If you cannot create the files, test the website, or publish it, say so clearly before claiming completion. Offer the closest useful alternative. Ask one focused question only if an essential detail is missing. Otherwise, proceed.
```

## Before you use the result with students

- Open the site on a laptop and a mobile phone. Check that the buttons are easy to tap and that there is no cut-off text.
- Add a small set of your own questions first. Test every answer, distractor and explanation before adding a larger question bank.
- Check that the final review shows the correct full sentence or completed passage.
- Confirm that the version number in the footer changes whenever you publish an update.

## If your AI assistant cannot make the file you want

Ask for the four editable files as separate code blocks: `index.html`, `style.css`, `app.js` and `data.js`. Save them together in one folder. A colleague with web-publishing experience can then publish that folder through GitHub Pages.

## What you can change

You can change the school details, colours, title, year group, term names, topic names, card descriptions, link-preview wording and all question data. Keep the separate-file structure, randomisation rule, answer-review rule, reported-speech distractor rule, fixed-width rule for any typed blanks and compact mobile builder layout, because these protect the quality of the student experience.
