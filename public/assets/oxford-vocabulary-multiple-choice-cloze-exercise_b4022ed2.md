# Oxford Vocabulary Multiple-Choice Cloze Exercise

## What this makes

This creates a Word multiple-choice cloze exercise from an Oxford vocabulary spreadsheet. It is designed for English learners and includes a passage, 12 questions, highlighted answers, and an updated vocabulary spreadsheet.

## What you need

- An Excel vocabulary list with the headings on row 3 and the vocabulary entries from row 4 onwards. It needs the columns `Word`, `POS`, `Used`, and `Cloze`.
- An optional Word template if you want the worksheet to follow a particular layout. It is used only as a guide.
- Your choices for `[LEARNER LEVEL]`, `[NUMBER OF QUESTIONS]`, `[STARTING QUESTION NUMBER]`, `[PASSAGE WORD COUNT]`, and `[SPELLING VARIETY]`.

## How to use it

1. Prepare the Excel file and, if wanted, the Word template.
2. Open your chosen AI assistant and attach the files.
3. Copy the whole prompt below. Change only the words in `[SQUARE BRACKETS]` if needed.
4. Send the prompt. Read through the result before giving it to students.

## Copy-and-paste prompt

```text
You are helping me create a multiple-choice cloze vocabulary exercise for [LEARNERS, YEAR GROUP AND CEFR LEVEL].

### Materials
I have provided:
- An Excel vocabulary list with headings on row 3 and vocabulary entries from row 4 onwards.
- [OPTIONAL: A Word template that shows the desired layout.]

Use the Excel file as the only vocabulary source. Use the Word template only as a visual guide. Do not edit the template; create a new Word document instead.

### Task
Create one classroom-ready multiple-choice cloze exercise in [UK ENGLISH / OTHER SPELLING VARIETY]. Write a coherent, student-friendly passage of [250] words, with a tolerance of [±10] words. Include exactly [NUMBER OF QUESTIONS] numbered blanks, beginning with Question [STARTING QUESTION NUMBER], and give four options, A–D, for every blank.

The passage must be suitable for [CEFR LEVEL] learners, using grammar, sentence structures and non-target vocabulary that are appropriate for that level. The topic must be easy for Hong Kong secondary-school students to understand and relate to. Avoid unfamiliar Western places, people and historical events, and avoid politics, government operations, economics and business operations as the central topic.

### Requirements
1. Read the full Excel list first. Treat a word as a target word only when its `Cloze` value is `TRUE`.
2. Build a target-word list from all rows where `Cloze=TRUE`. Build a distractor pool from all rows where `Cloze=FALSE` and `Used=FALSE`.
3. Check the available target words and distractors by part of speech before selecting the exercise words. If there are not enough suitable items, ask one focused question before writing the exercise.
4. Review every target word before choosing the final set. Select only [NUMBER OF QUESTIONS] target words that can form one clear and natural passage.
5. Before writing the passage, check that every selected answer is in the target-word list. If any selected answer is not in that list, stop and report the problem.
6. Use exactly [NUMBER OF QUESTIONS] different answers, all from the target-word list. Use each answer only once in the passage and only once in the options.
7. Write natural, fluent and idiomatic English. Link ideas clearly so that the passage reads as a unified whole, rather than as separate sentences.
8. Use no more than one blank in each complete sentence.
9. The blank must replace the whole answer. Do not leave any visible ending such as `-ed`, `-s` or `-ing` next to a blank. Reword the sentence if necessary so that the whole word can be replaced.
10. Number blanks in their order of appearance as `__([STARTING QUESTION NUMBER])__`, `__([NEXT QUESTION NUMBER])__`, and so on, ending with `__([LAST QUESTION NUMBER])__`.
11. If a blank follows an indefinite article, write `a/an` before the blank, not `a` or `an`.
12. An answer may be changed to another grammatical form only when its part of speech stays the same. Any distractors must match both the answer’s part of speech and its exact word form. For example, a past-tense verb needs three past-tense verb distractors.
13. Select distractors only from the unused distractor pool. They must fit the grammar of the sentence but be clearly wrong in its meaning. A word may be used only once anywhere in the exercise, whether it is an answer or a distractor.
14. Plan a balanced answer key before choosing distractors. For a [NUMBER OF QUESTIONS]-question exercise, A, B, C and D must each be the correct answer 2–4 times. A 3–3–3–3 split is preferred.
15. Put all four options in ascending visual width from shortest to longest in Arial Narrow. Do not sort them by letter count. Use this approximate character-width calculation for every comparison:

    a=0.50, b=0.50, c=0.45, d=0.50, e=0.50, f=0.28, g=0.50, h=0.50, i=0.22, j=0.22, k=0.45, l=0.22, m=0.72, n=0.50, o=0.50, p=0.50, q=0.50, r=0.30, s=0.45, t=0.28, u=0.50, v=0.45, w=0.67, x=0.45, y=0.45, z=0.45; A=0.56, B=0.56, C=0.61, D=0.61, E=0.56, F=0.50, G=0.67, H=0.61, I=0.22, J=0.39, K=0.56, L=0.45, M=0.67, N=0.61, O=0.67, P=0.56, Q=0.67, R=0.61, S=0.56, T=0.50, U=0.61, V=0.56, W=0.78, X=0.56, Y=0.56, Z=0.50; space=0.28, hyphen=0.33, apostrophe=0.19, full stop=0.28, comma=0.28. Add the values for every character in an option; use 0.50 for an unlisted character.

16. Choose distractors strategically so that, after the width calculation has been applied, the correct answer is in its planned A, B, C or D position.

### Output
Provide two files.

1. A newly created Word document named `[ORIGINAL FILENAME]_EXERCISE.docx`. Match the uploaded template’s layout where possible. Include the heading `NEW EXERCISE`, clear student instructions, the completed cloze passage and a question table with columns for question number, A, B, C and D. Format every correct option in bold, underlined red text (RGB 255, 0, 0).

2. An updated Excel file named `[ORIGINAL FILENAME]_UPDATED.xlsx`. For every word used as an answer or distractor, set `Used` to `TRUE` and apply a light-green fill to the whole row. Keep any words that were already marked as used.

### Check before delivery
Check that:
- The passage is [PASSAGE WORD COUNT] words, within the stated tolerance of [±10] words, and contains exactly [NUMBER OF QUESTIONS] blanks.
- The passage is appropriate for [CEFR LEVEL] learners, uses [SPELLING VARIETY], has a relatable topic, and reads naturally.
- All non-target vocabulary is suitable for the stated CEFR level. If you cannot check against a named word list, say that clearly and ask the teacher to review the level.
- Each sentence contains no more than one blank.
- Each blank replaces a complete word, the blanks are sequential from [STARTING QUESTION NUMBER] to [LAST QUESTION NUMBER], and `a/an` is used where needed.
- Every correct answer comes from a row where `Cloze=TRUE`.
- Every distractor comes from a row where `Cloze=FALSE` and `Used=FALSE` before this exercise starts.
- Every option is unique, all distractors match the answer’s part of speech and word form, and every answer occurs only once in the passage.
- Every question’s options are ordered by the supplied Arial Narrow visual-width calculation.
- A, B, C and D each occur 2–4 times as the correct answer.
- The Word document is newly created, the correct options are bold, underlined and red, and the updated Excel file has marked and highlighted all newly used words.

Give a short verification table and an answer-key table in your final response.

If you cannot read an attached file, create a Word document, update an Excel file, calculate the option widths, or check the layout, say so before proceeding. Provide the closest useful plain-text worksheet and a clear list of the spreadsheet changes instead. Do not say that a file or check has been completed if it has not.

Ask one focused question only if an essential input is missing. Otherwise, proceed.
```

## Before you use the result with students

- Check that the passage is clear, natural and right for the intended learner level.
- Check that the answer key is balanced and that the correct answer is not given away by a visible word ending or by `a` or `an` before a blank.
- Open the Word document and check the passage, tables, red text and underlining.
- Open the Excel file and check that every newly used answer and distractor is marked `TRUE` and highlighted green.

## If your AI assistant cannot make the file you want

Ask for an editable Markdown table or a plain-text worksheet, together with a list of every answer and distractor used. You can paste the content into your own Word template and update the spreadsheet yourself.

## What you can change

You can change `[LEARNERS, YEAR GROUP AND CEFR LEVEL]`, `[NUMBER OF QUESTIONS]`, `[STARTING QUESTION NUMBER]`, `[LAST QUESTION NUMBER]`, `[PASSAGE WORD COUNT]`, and `[SPELLING VARIETY]`. Set `[LAST QUESTION NUMBER]` to the starting number plus the number of questions minus one. Keep the spreadsheet-selection rules, the one-blank-per-sentence rule, full-word blanks, part-of-speech matching, visual-width ordering, answer-key balance and final checks unchanged because they keep the exercise fair and accurate.

[Back to top](#oxford-vocabulary-multiple-choice-cloze-exercise)
