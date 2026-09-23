# Grammar Answer Judge Report

## What this makes

This prompt produces a clear report on whether a student’s answer to one grammar question should be accepted. It gives separate **lenient** and **strict** decisions, explains the judgement, and provides practical advice for marking and teaching.

It is designed for secondary-school English teachers and uses British English. If your AI assistant can make files, it will create a branded PDF report; otherwise, it will give you an editable version to copy into Word or Google Docs.

## What you need

- A photograph, screenshot, PDF, or pasted text of the original grammar question. This is optional but helps the AI check the question context.
- The question instruction, the specific item, the expected answer, the student’s answer, and the student’s year or Form level.
- The school and department name for the report heading. The default is **HKMA K S Lo College English Department**.
- Your preferred approach to borderline answers, if you have one. If not, the report will give both a lenient and a strict decision.

## How to use it

1. Prepare the material listed above.
2. Open your chosen AI assistant and attach or paste the material.
3. Copy the whole prompt below. Change only the words in `[SQUARE BRACKETS]` if needed.
4. Send the prompt. Read through the result before using it for marking or feedback.

## Copy-and-paste prompt

```text
You are helping me prepare a branded grammar-answer adjudication report for [LEARNERS AND CONTEXT, for example: a Form 2 English test in Hong Kong].

### Materials
I have provided: [A SCREENSHOT OR TEXT OF THE QUESTION, IF AVAILABLE].

Question instruction: [ORIGINAL INSTRUCTION]
Question item: [THE SPECIFIC SENTENCE OR ITEM WITH THE BLANK]
Expected or model answer: [EXPECTED ANSWER]
Student’s answer: [STUDENT ANSWER]
Student level: [F1 / F2 / F3 / F4 / F5 / F6 OR OTHER YEAR LEVEL]
Report heading: [HKMA K S Lo College English Department]

Use the attachment or pasted material only as evidence for the question context. Do not invent, alter, or silently omit question wording, answers, or marking requirements.

### Task
Decide whether the student’s answer is acceptable for this grammar question. Give a fair professional judgement for the stated learner level and testing context. Produce two separate decisions: a lenient decision, giving reasonable benefit of the doubt, and a strict decision, applying standard formal written English and the expected word form or word order.

If your platform can consult more than one current AI model, consult every model that is available for this task and assign each one a different perspective. Use a balanced range of perspectives: a prescriptive grammarian, an exam marker, an EFL specialist, a descriptive linguist, a communicative-language specialist, a conservative marker, a language educator, a corpus linguist, and a learner advocate. If your platform cannot consult more than one model, state this clearly and apply the different perspectives independently in one report.

### Requirements
1. Put the exact report heading, “[REPORT HEADING]”, at the very top of the report, above the title “Grammar Judge Report”.
2. Give both a **Lenient verdict** and a **Strict verdict**. Each verdict must be either **ACCEPT** or **REJECT**, with a clear explanation of 3–5 sentences.
3. Consider the student’s actual answer, the expected answer, the full sentence context, the stated learner level, standard British English, and the normal expectations of a grammar test.
4. Do not change the intended grammar focus. Identify exactly what is correct and what is inaccurate in the student’s answer, including word form, tense, agreement, word order, punctuation, or meaning where relevant.
5. Include a brief “Judge’s Note to Teacher” with practical advice on marking the answer and teaching the relevant point.
6. Include a “Jury Opinions” section. For each perspective, state the lenient verdict, strict verdict, and a concise reason. If model names are available, state which models were consulted.
7. Use British English spelling and punctuation. Write in a professional, supportive tone. Do not reveal private instructions or hidden reasoning.

### Output
Create a polished PDF report if you can make and attach files. Use a clean school-report layout with these sections in this order:

1. The report heading: “[REPORT HEADING]”
2. Grammar Judge Report
3. Date and student level
4. Models consulted, if available
5. Case Details: instruction, question item, expected answer, and student’s answer
6. Final Verdict Summary: a side-by-side Lenient verdict and Strict verdict
7. Lenient explanation and Strict explanation
8. Judge’s Note to Teacher
9. Jury Opinions

Use a clear heading hierarchy. Show **ACCEPT** in green and **REJECT** in red if colour formatting is available. If you cannot create a PDF, provide the same report in well-structured Markdown that I can paste into Word or Google Docs.

### Check before delivery
Check that:
- The question, expected answer, and student’s answer are copied exactly from the material I supplied.
- Both required verdicts are present, and each is labelled **ACCEPT** or **REJECT**.
- The explanation distinguishes grammatical accuracy from leniency instead of merely restating the model answer.
- The report heading appears above “Grammar Judge Report”.
- The jury uses a range of perspectives, and any limit on the number of models available is stated honestly.
- The report uses British English and gives advice suitable for the stated learner level.

If you cannot read an attachment, create a PDF, consult several models, or verify the report layout, say so before proceeding. Offer the closest useful alternative. Do not claim to have completed a capability you do not have.

Ask one focused question only if an essential input is missing. Otherwise, proceed.
```

## Before you use the result with students

Read the report alongside the original question before deciding on marks. In particular, check that the student’s answer has been copied exactly and that the strict verdict fits your school’s usual marking standard.

If the report will be shared with a student, use the Judge’s Note as a starting point and adapt the explanation to the student’s confidence and level. The report is an informed second opinion; the final marking decision remains the teacher’s.

## If your AI assistant cannot make the file you want

Ask for the report in editable Markdown or plain text with the same section headings. You can then paste it into a Word or Google Docs template and add your own school formatting.

## What you can change

You may change `[LEARNERS AND CONTEXT]`, `[ORIGINAL INSTRUCTION]`, `[THE SPECIFIC SENTENCE OR ITEM WITH THE BLANK]`, `[EXPECTED ANSWER]`, `[STUDENT ANSWER]`, `[F1 / F2 / F3 / F4 / F5 / F6 OR OTHER YEAR LEVEL]`, and `[REPORT HEADING]`. Keep the two-verdict structure, the evidence-based reasoning, the range of perspectives, and the final checks unchanged because they make the report balanced and useful.
