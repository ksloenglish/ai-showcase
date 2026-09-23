# S2 Vocabulary Revision Website

## What this makes

This prompt creates a responsive browser-based vocabulary revision exercise for Hong Kong Secondary 2 students. The finished site includes practice questions, revision flashcards, clear answer feedback and a results screen.

## What you need

- A vocabulary list with each item’s word or phrase, part of speech, Chinese and/or English definition, and a suitable example sentence.
- Optional confirmed CEFR levels for individual **words**. Do not provide CEFR levels for phrases.
- The term and unit structure you want, for example **Second Term, Unit 5, Unit 6 and Unit 8**.
- The question counts you want students to choose, for example **10**, **20** or **30** questions.

## How to use it

1. Prepare the vocabulary list and organise it by unit.
2. Open your chosen AI assistant and attach or paste the materials.
3. Copy the whole prompt below. Change only the words in **[SQUARE BRACKETS]** if needed.
4. Send the prompt. Test the website on a computer and a phone before sharing it with students.

## Copy-and-paste prompt

```text
You are helping me create a browser-based vocabulary revision website called **S2 Vocab Revision** for [LEARNERS, FOR EXAMPLE: HONG KONG SECONDARY 2 STUDENTS]. Use British English throughout.

### Materials
I have provided: [A VOCABULARY LIST OR FILE, OR A DESCRIPTION OF THE REQUIRED UNITS].

Use only vocabulary, definitions, parts of speech, CEFR levels and example sentences that you can read in the materials. Do not invent, alter or silently omit source content. If essential information is missing for a vocabulary item, ask one focused question before building the final exercise.

### Task
Create a complete, responsive vocabulary revision website using plain HTML, CSS and JavaScript, without requiring a framework or a build step. Keep the files separate and easy to edit:

- `index.html` for the page structure;
- `style.css` for all styling and responsive behaviour;
- `data.js` for the vocabulary units and their items;
- `engine.js` for question generation, scoring and distractors; and
- `ui.js` for screen rendering and student interactions.

The site must work as a standalone browser exercise and be ready to publish on a simple static website host.

### Vocabulary data
Store the vocabulary in units. Every unit must have a term number, a label, a `words` list and a `phrases` list. Every item needs:

- `item`: the canonical word or phrase;
- `pos`: `n`, `v`, `adj`, `adv` or `phrase`;
- `defEn` and `defZh`;
- `sentence`: an accurate sample sentence containing `{BLANK}`; and
- `sentenceForm`: the exact grammatical form that belongs in the sentence.

Use British spelling and accurate Oxford-style definitions. Use `sb`, `sb's`, `sth` and `be` consistently in English definitions, and italicise these placeholders wherever they are displayed.

For an optional confirmed CEFR level, use only `A1`, `A2`, `B1`, `B2`, `C1` or `C2`, and attach it to a word only. Do not assign a CEFR level by guesswork or add one to a phrase.

For phrases split by other words in the sentence, use two `{BLANK}` tokens and show the two phrase parts in `sentenceForm` with ` / ` between them. For example, use `figure / out`, not a shortened form such as `figure`.

### Student experience
Create these screens:

1. A title screen where students choose a term, one or more units, a question count, and Chinese or English definitions. Chinese should be selected by default.
2. A practice screen with progress, score, timer, a clear question card and a Next Question button.
3. A revision mode that lets students flip vocabulary flashcards, move through the selected units, shuffle the cards and see example sentences.
4. A results screen with score, time, a short encouraging remark, and separate lists for **Words Practised** and **Phrases Practised**. Show the number of practised items next to each heading.

Show a unit badge on each question and next to each item on the results screen. Show a teal part-of-speech badge in the results lists. For words with a confirmed CEFR level, show a coloured CEFR badge on flashcards and results; do not show an empty badge for other items.

Use the branding **K S Lo English** and the title **S2 Vocab Revision** on the title page and every exercise page. Put this footer at the bottom: `© [CURRENT YEAR] K S Lo English. All Rights Reserved.`

### Question types
Create the following question types:

1. **Choose the correct word or phrase from a definition**.
2. **Choose the correct word or phrase to complete a sentence**.
3. **Choose the correct definition for a word or phrase**.
4. **Fill in the blank** with a first-letter hint.
5. **Split-blank fill** for phrases with two blanks. Provide two clearly labelled inputs and numbered hints in the sentence.
6. **Matching**: pair a set of five words or phrases with five definitions.
7. **Anagram**: for single words only, show the chosen-language definition and a rack of shuffled letter tiles.

Distribute the five regular question types—definition-to-word, sentence multiple choice, definition multiple choice, fill-in-the-blank and anagram—as evenly as possible. Reserve anagram slots for **word** items only so that phrases do not reduce the number of anagram questions. Add matching sets at regular intervals.

Do not repeat a vocabulary item until unused items have been exhausted. For matching questions, draw unused items first. If the requested activity is longer than the available pool, reuse items only after unused items are exhausted; do not mix previously used and unused items within one matching set, and never include the same item twice in one matching set.

### Part of speech and feedback
For definition-based prompts and anagram prompts, display an italicised part-of-speech label with no full stop, for example `(n)`, `(v)`, `(adj)`, `(adv)` or `(phr)`.

For word-to-definition questions, show the label next to the word prompt. Keep the definition options free of labels so students focus on selecting the meaning.

Allow students to continue after an incorrect multiple-choice attempt, but do not award a point after any incorrect attempt. For fill questions, reveal the correct form clearly inside the sentence after a wrong submission. Do not repeat an answer prefix that is already visible in the sentence, such as `was` in a be-led phrase.

### Distractors and grammar
Create exactly four distinct options for multiple-choice questions whenever the exercise design requires four options. Distractors must be plausible, grammatical and appropriate for the sentence context.

- Match the tense and form required by the sentence.
- Do not conjugate nouns, adjectives, adverbs, article-led phrases, preposition-led phrases, be-led phrases or modal verbs such as `would`, `could`, `should`, `might`, `must`, `will`, `may` and `can`.
- Do not create impossible forms such as `woulded`, `coulded`, `incidenting`, `playying` or `fosterring`.
- When making spelling distractors, make one clear change only; protect the first and last letters and common suffixes. Reject candidates that are real English words or acceptable spelling variants.
- Do not mix correctly spelt vocabulary options with a set intended to test misspellings.
- Avoid distractors that are duplicates, simply a different form of the correct answer, or obviously revealed by a different display format.

### Anagram rules
Use anagrams only for single words, never phrases. Show the definition and part-of-speech label above the tiles.

Keep the empty answer field above the letter rack. A student taps a rack tile to move it to the answer field and taps an answer tile to return it to the rack. The Submit button must stay disabled until every letter tile has been placed, preventing accidental submission.

Keep the answer tiles on one line. On narrow screens, allow the rack to wrap to two rows so the tiles remain large enough to tap. Scale tile size and spacing by word length without letting tiles overflow, clip or become impractically small.

For a correct answer, turn the answer tiles green and award one point. For an incorrect answer, leave the student’s tiles visible in red and show the correct spelling below in green tiles. If a student submits an empty answer field, animate the correct tiles into the answer field in amber and award no point. Do not repeat the definition in anagram feedback and do not show a separate Give Up button.

### Design and responsive layout
Use a polished dark, modern study interface with a clear hierarchy, rounded cards, readable text, obvious feedback colours and comfortable spacing. Add small transition and button-press effects, but do not sacrifice speed or clarity.

The site must display properly on desktop, tablet and mobile browsers. Keep the header visible when a mobile keyboard opens. Use touch-friendly controls and prevent sticky mobile tap highlights. Make sure long definitions, long vocabulary items and long anagram words remain readable without clipping.

### Output
Provide all five website files in a clearly labelled project folder or as separate code blocks, plus a short setup note explaining how to open the site through a local web server and publish it on a static web host.

Also provide a concise teacher guide that explains how to add a unit, edit vocabulary data and check the finished exercise.

### Check before delivery
Check that:

- Every vocabulary item has the required fields, accurate British-English spelling, an appropriate part of speech and a valid example sentence.
- All question types work, including split-blank phrases, matching, flashcards and anagrams.
- The five regular question types are evenly represented as far as the selected question count allows, and anagrams are drawn from word items only.
- No vocabulary item is repeated before unused items are exhausted; matching sets contain no duplicate item.
- Multiple-choice options are distinct, grammatical, correctly formed for the sentence and free from invented words.
- Part-of-speech labels use the correct italicised format with no full stop.
- Anagram tiles remain usable on a narrow phone screen: rack may use two rows, while the answer stays on one line without overflow.
- Wrong-answer feedback clearly shows the correct answer without unnecessary repetition.
- The progress bar reaches 100% on the final question, and the results counts include all items students encountered, even after incorrect answers or an empty anagram submission.
- The branding, title and copyright footer appear on every screen.

If you cannot create a working website, run a local preview, or check mobile display, say so before proceeding. Provide the complete code and a simple manual test checklist instead. Do not claim that the site has been published unless you have actually published it.
```

## Before you use the result with students

Open the site on a computer and a phone. Complete a short exercise before students use it. Pay particular attention to the example sentences, incorrect options, long words and any items students may reasonably interpret in more than one way.

| Check | What to look for |
|---|---|
| **Vocabulary data** | Definitions, parts of speech, CEFR labels and example sentences are accurate. |
| **Question mix** | All intended question types appear and repeated items do not appear too early. |
| **Distractors** | Options are grammatical, distinct and clearly incorrect where required. |
| **Mobile display** | Long definitions, buttons and tiles fit comfortably on the screen. |
| **Results and revision** | Practised-item counts, flashcards, feedback and badges work as expected. |

## If your AI assistant cannot make the file you want

Ask it for the five separate code files and a simple manual test checklist. You can then upload the files to a static web host or ask a colleague to do so.

## What you can change

You can safely change **[LEARNERS]**, **[A VOCABULARY LIST OR FILE]**, the unit labels, the question counts and the definition language. Keep the rules about accurate vocabulary, British English, grammatical distractors, responsive testing and no premature repetition because they protect the quality of the exercise.
