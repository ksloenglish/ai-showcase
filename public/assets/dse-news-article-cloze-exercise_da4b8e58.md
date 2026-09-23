# DSE News Article Cloze Exercise

## What this makes

This prompt turns a news article image, PDF, or pasted article into an HKDSE-style cloze exercise. It includes a checked transcription, a student worksheet, a student answer key, and a detailed teacher key.

The activity is written mainly at CEFR B2 level and uses British English.

## What you need

- A clear news article image, PDF, or pasted article text.
- A CEFR word list or vocabulary reference if you need the CEFR labels in the answer keys to be checked accurately.
- An optional template if you want the final work placed in a particular Word-document layout.
- The small settings in square brackets below, if you wish to change the class level or task size.

## How to use it

1. Prepare a readable copy of the article. If necessary, crop or enlarge a dense scan first.
2. Open your chosen AI assistant and upload or paste the article. Upload your CEFR reference too, if needed.
3. Copy the full prompt below. Change only the words in `[SQUARE BRACKETS]`.
4. Send the prompt, then review the transcription and answer key before using the worksheet with students.

## Copy-and-paste prompt

```text
You are helping me create an HKDSE English cloze exercise for [HKDSE STUDENTS / YEAR GROUP].

### Materials
I have provided: [A NEWS ARTICLE IMAGE / PDF / PASTED ARTICLE TEXT] and [A CEFR WORD LIST OR VOCABULARY REFERENCE, IF PROVIDED].

Use only information that you can read from the supplied article. Do not invent, correct, summarise, alter, or silently omit source content. Use British English.

### Task
Complete the following two steps in order.

First, make a faithful transcription of the main article text. Then create an article-style cloze passage based only on that verified transcription.

### Requirements

#### Step 1 — Transcription
1. Transcribe the main article body word for word. Preserve the original capitalisation, punctuation, headings, subheadings, and paragraph breaks.
2. Include the article title and all in-article headings or subheadings.
3. Exclude photo captions, sidebars, advertisements, QR codes, URLs, page numbers, issue dates, and publication mastheads.
4. After the transcription, add a heading called “Notes on Visibility:”. Write “All lines were legible.” if that is true. Otherwise, mark every unreadable or missing part as `[unclear]` or `[section not visible]`.
5. Before moving to Step 2, check the transcription carefully:
   - Count the named headings in the article and in the transcription. The numbers must match.
   - Check that each section has the same number of paragraphs as the article.
   - For each section, check that the first and last words match the readable source.
   - If the article has more than one column, check that every column has been included in reading order.
   Correct any missing or incomplete text before creating the exercise.

#### Step 2 — Cloze passage
Create one cohesive article-style cloze passage from the verified transcription.

1. Use the original article title.
2. Write [190–210] words in the passage body, excluding the title and the task instruction.
3. Keep the language mainly CEFR B2 and student-friendly.
4. Use exactly [15] blanks. Show each blank as the number in brackets, the answer’s first letter in bold, and five underscores; for example, **(3)d_____**.
5. Put only one blank in each sentence. Never put two blanks in the same sentence.
6. Make the passage flow as a unified article. Use natural links between ideas where needed, such as “However”, “For example”, “Consequently”, or “Despite this”.
7. Keep important word partnerships from the article where possible. The words around each target answer should preserve the original collocation so that the context offers useful clues.

#### Answer-word rules
1. Each answer must be one word from the article, or a grammatically correct form derived from a word in the article.
2. Use [15] different answers. Do not repeat any answer.
3. First identify a broad pool of candidate words and check their CEFR levels against the supplied vocabulary reference. Select only B2, C1, C2, or unlisted words that are relevant and worthwhile to learn. Do not select A1, A2, or B1 words.
4. Do not guess CEFR levels. If the reference has no exact entry for a word in its correct part of speech, label it “Unlisted”. For adjective answers, check the adjective entry rather than a related noun, verb, or adverb.
5. Exactly [5] answers must need a grammatical form change from the word in the article. For example, this may be a base verb from a past-tense verb, a noun from a verb, or a singular noun from a plural noun.
6. Arrange answers 1–[15] in exactly the same order as their source words appear in the article. Verify this by locating the character position of each source word in the transcription and checking that the positions rise strictly from 1 to [15]. If you cannot calculate these positions, say so clearly and provide a manual order check instead; do not claim that the check was completed automatically.
7. Spread the answers across the whole article. No named section or thematic group may provide more than [3] answers.

### Output

First provide the verified transcription, followed by “Notes on Visibility:”. Then provide the following three clearly labelled parts.

#### Part 1 — Cloze Passage (Student Version)
Start with this exact instruction:

“Based on the information in the news article, complete the following text by writing ONE word in each blank below. Your answers must be grammatically correct.”

Then provide the article title in bold, the cloze passage, and a blank answer grid with [3] columns and [5] rows for answers 1–[15].

#### Part 2 — Answer Key (Student Version)
Provide a numbered answer grid with [3] answers per row and [5] rows. Put the checked CEFR level in brackets after each listed answer. Omit the level in this student key if the word is unlisted.

#### Part 3 — Detailed Answer Key (Teacher Version)
Provide a five-column table with these headings:

| No. | Answer | CEFR Level | Transformed? | Source Word in Article |

Use “Yes” or “No” for “Transformed?”. Use “Unlisted” in the CEFR Level column when the supplied reference has no exact matching entry.

### Check before delivery
Check and state the result of every item below:

- The transcription is a faithful copy of the readable main article text, and all unreadable parts are clearly marked.
- The cloze passage reads naturally, maintains the article’s meaning, and uses clear links between ideas.
- The body is within [190–210] words. State the exact word count.
- There are exactly [15] blanks in strict source order. List the source-word positions and confirm that they rise strictly.
- Exactly [5] answers are grammatical form changes. List the source word and the answer for each one.
- The answer-word screening is complete, and none of the selected answers is A1, A2, or B1.
- The student key and teacher key match the passage exactly, and the teacher key has all five required columns.
- Each blank is the only blank in its sentence. List the sentence containing each blank to show this.
- Every adjective answer was checked as an adjective in the CEFR reference. List those adjective answers and their confirmed levels or “Unlisted” status.
- The answers are spread across the article. List the article sections or thematic groups and the number of answers from each. Confirm that none has more than [3].
- The passage preserves useful source collocations around answers. Give [2–3] brief examples showing the source wording and the cloze-passage wording.

If you cannot read an attachment, confirm a CEFR level, calculate positions, create the requested file, or check a requested layout, say so before finalising. Offer the closest useful version that you can provide. Do not claim that a check has been completed when it has not.

Ask one focused question only if an essential article page, image, or CEFR reference is missing. Otherwise, proceed.
```

## Before you use the result with students

- Compare the transcription with the article, particularly headings, figures, names, quotations, and the beginning and end of each section.
- Check that there are exactly 15 blanks, that no sentence contains two blanks, and that the answers follow the source order.
- Check the answer grid and the two answer keys against the teacher table.
- If you use CEFR labels for planning or assessment, confirm them against your own approved word list.
- If you asked for a Word layout or used a template, open the file and check the tables, line spacing, and page breaks.

## If your AI assistant cannot make the file you want

Ask for an editable Markdown table or plain-text worksheet instead. You can paste this into your own Word template and make final layout changes yourself.

## What you can change

You may change `[HKDSE STUDENTS / YEAR GROUP]`, `[190–210]`, `[15]`, `[5]`, `[3]`, and `[2–3]` to suit a different class. Keep the source-only content, answer screening, source order, one-blank-per-sentence rule, answer keys, and final checks because they protect the accuracy and usefulness of the activity.
