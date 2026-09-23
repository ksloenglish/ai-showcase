# Four-option vocabulary practice website

## What this makes

This prompt helps an AI assistant build or improve a responsive vocabulary practice website for secondary English learners. The exercise uses sentence completion, reviewed question data, and British English throughout.

## What you need

- The existing website source code, if you are improving a current exercise.
- The approved question data that students may use, or a clear description of its structure.
- Your school name, exercise title, logo, colours, and any existing design examples.
- The learner group, vocabulary levels, number of questions, and whether you want a new website or changes to an existing one.

## How to use it

1. Prepare the materials listed above.
2. Open an AI assistant that can work with website code and attach or paste the materials.
3. Copy the whole prompt below. Change only the words in `[SQUARE BRACKETS]` if needed.
4. Send the prompt. Test the finished exercise before giving it to students.

## Copy-and-paste prompt

```text
You are helping me develop [A NEW / AN EXISTING] vocabulary practice website for [LEARNERS AND SCHOOL CONTEXT].

### Materials
I have provided: [THE CURRENT SOURCE CODE OR A DESCRIPTION OF THE NEW SITE], [APPROVED QUESTION DATA OR ITS STRUCTURE], and [ANY LOGO, COLOUR, OR SCREENSHOT REFERENCES].
Use only the question data and visual materials I have provided. Do not invent vocabulary content, revise sentences, create distractors, or add private teaching records.

### Task
Create or improve a polished, responsive English vocabulary exercise called [EXERCISE TITLE]. It must use sentence-completion questions with four choices. Build a clear student journey from setup, to practice, to results. Keep the design calm, academic, and easy to use on phones, tablets, and laptops.

### Requirements
1. Use British English. Keep only three student screens unless I ask for more: a setup screen, a Question screen, and a Results screen.
2. Each question must show one sentence with exactly one blank, one correct stored answer, and three stored distractors. Shuffle the four visible choices once at the start of an exercise and keep that order when a student resumes.
3. Let students choose a vocabulary collection, a word range, and a question count. If a full list joins two halves, require an even question count and choose exactly half from each half before shuffling.
4. Award one mark only for a correct first attempt. After a wrong choice, show the definition of the chosen wrong word and let the student try again without gaining a mark. After a correct answer, show the target word’s definition.
5. Save a paused exercise so refresh or return keeps the same question order, choices, attempts, score, question number, and active time. Count only visible, focused practice time. Give students a clear Quit confirmation that removes the saved exercise.
6. On Results, show score, accuracy, active time, vocabulary level, a short review list of practised words and definitions, a copy action, and a Play again action.
7. Use only approved public question data. Each student-facing question record should contain a stable ID, word, collection and range labels, one blanked question sentence, one answer, exactly three distractors, the target definition, and definitions for all four visible options. Do not expose authoring notes, source records, rejected options, review comments, or other private data.
8. Make the site responsive. Keep phone Question pages at 620 px and below. Use a compact tablet layout from 621–1100 px and extend it through 1366 px only for devices with a coarse pointer, so normal Chrome on an iPad receives the tablet design while an equal-width laptop keeps the desktop design. Do not use user-agent detection.
9. Keep compact Question pages free from scrolling after a student answers. Preserve a visible Question header, progress, sentence, four answer choices, feedback and definition, Next or Finish, version, and copyright. Keep answer choices at least 48 px high on phones and 52 px high on iPad; keep Next or Finish at least 44 px high.
10. Use a distinctive academic visual style rather than a generic quiz design. Use [YOUR BRAND COLOURS AND LOGO], a readable display typeface for headings, clear body text, ruled-paper or folio details, numbered choices, strong selected states, and restrained animation. Keep all text easy to read against its background.
11. Show an automatic Hong Kong build version in the format `yyyyMMdd.HHmm` and a copyright line: `© [CURRENT YEAR] [SCHOOL OR BRAND]. All Rights Reserved.` Do not use a logo image as a social-sharing preview unless I explicitly ask for one.
12. If you can access the public website source, publish only after I give explicit permission. Use only self-contained public images and files in the published website.

### Output
If you can edit the supplied project, make the smallest clear set of changes and provide a short summary of the files changed, the question-data structure used, and the tests completed. If you cannot edit the project directly, provide a clearly labelled plan and code patches that a developer can apply.

Use British English.

### Check before delivery
Check that:
- every exercise question has exactly four visible choices: one answer and three stored distractors;
- question order, option order, progress, score, and active time resume exactly after refresh;
- wrong-choice definitions, recovery scoring, Next, Finish, Quit, Results, copying, and Play again work correctly;
- question data contains only student-safe fields and no private authoring or review information;
- the exercise works with real short and long questions, long answer choices, and long definitions;
- at 390×844 and 412×800, the phone Question page fits without scrolling in unanswered, wrong-answer, and correct-answer states;
- at 1366×953, 1180×760, 1024×650, 1024×715, 820×1080, and 768×1024 touch-tablet sizes, the Question page fits without scrolling in the same three states;
- an equal-width laptop keeps the desktop layout rather than the compact tablet layout;
- the published website has no broken links, private files, or accidental social-preview images; and
- if you publish it, a fresh link shows the new visible build version after caches have updated.

If you cannot read an attached file, edit the source code, run a required check, or publish the website, say so before proceeding. Offer the closest useful alternative. Do not claim to have completed a capability you do not have.

Ask one focused question only if an essential input is missing. Otherwise, proceed.
```

## Before you use the result with students

- Start a short exercise, choose a wrong answer once, then recover with the correct answer.
- Refresh the page during practice and check that the same exercise returns.
- Open the site on a phone, an iPad, and a laptop before sharing it with students.

## If your AI assistant cannot build or publish the website

Ask it for a clear development plan, a student-safe question-data example, and labelled code patches. Give these to the person who manages your school website or exercises.

## What you can change

You may change the school name, title, learner group, logo, colours, vocabulary levels, and question counts in brackets. Keep the four-choice sentence-completion format, approved-data rule, first-attempt scoring, responsive checks, and private-data protection unchanged because they make the exercise reliable for students.
