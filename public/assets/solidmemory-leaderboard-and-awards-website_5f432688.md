# Create a SolidMemory Leaderboard and Awards Website

## What this makes

This prompt helps a teacher create a mobile-friendly school website showing live SolidMemory leaderboards and official award results. It also asks for a protected admin area, automatic updates, reliable ranking rules and clear checks before publication.

## What you need

- The SolidMemory report or API details needed to read student names, classes, groups, exercise days, first-attempted words and all-attempted words.
- Your school logo, school name, brand colours and the forms or year groups to include.
- Your competition periods, ranking rules, learning targets, number of winners and prize wording.
- Optional screenshots of a website design you want the result to resemble.
- Access to secure database, sign-in, secret-storage and scheduling services if you want a working live website rather than a design and code package.

## How to use it

1. Prepare the material listed above. Do not paste passwords, access tokens or identifiable student records into an ordinary chat message.
2. Open your chosen AI assistant and attach or paste the material.
3. Copy the whole prompt below. Change only the words in `[SQUARE BRACKETS]` if needed.
4. Send the prompt. Review the proposed rules and visual mock-ups before allowing the assistant to finalise or publish the website.

## Copy-and-paste prompt

```text
You are helping me create a secure SolidMemory leaderboard and awards website for [SCHOOL NAME]. It will be used by [FORMS OR YEAR GROUPS] and managed by authorised school staff. Use British English throughout.

### Materials
I have provided: [SOLIDMEMORY REPORT OR API DETAILS], [COMPETITION AND AWARD RULES], [SCHOOL LOGO AND BRAND DETAILS], and optionally [REFERENCE SCREENSHOTS OR EXISTING WEBSITE].

Use only information you can read from these materials. Do not invent, alter or silently omit data fields, ranking rules, dates, prizes or API behaviour. Treat student information and authentication details as confidential. Keep passwords and tokens in secure settings rather than source code or chat output.

### Task
Plan and create a responsive website with three parts: public leaderboards, public award results and a protected admin area. Before building, summarise the proposed pages, data fields, ranking rules, competition periods, update schedule and privacy safeguards. When a design choice is subjective, show me a mock-up and wait for my approval before finalising it.

### Requirements
1. Create monthly leaderboards for [FORMS OR YEAR GROUPS]. Each form may show up to 20 students.

2. Rank monthly students by Days With Exercise Done, then First Attempted Words, then All Attempted Words, all in descending order. Use a consistent final tie-breaker such as the student identifier.

3. Exclude a student from a monthly board when both Days With Exercise Done and First Attempted Words are zero. Do not use All Attempted Words to decide whether the student was active, because it may be a lifetime total. A monthly list may contain fewer than 20 students.

4. When a monthly form has no qualifying students, display: “No students have achieved the learning targets so far. Check back as the competition period progresses.”

5. Create an annual Top 20 leaderboard. Include only valid student forms and rank by Days With Exercise Done, then All Attempted Words, then First Attempted Words, all in descending order.

6. Create a Wordsmith leaderboard from the annual records. Rank by All Attempted Words. Show places 1–3 as a gold, silver and bronze podium; these are the only Wordsmith award winners. Show places 4–10 below the podium as runners-up, using compact rows with rank, rank-change indicator, English and Chinese names, class, group, class number and All Attempted Words. Hide the runners-up section when fewer than four entries exist.

7. Compare each new leaderboard snapshot with the previous snapshot for the same board. Show whether a student moved up, moved down, stayed unchanged or is new.

8. Display the active competition period and the last-updated date and time in Hong Kong time. Display dates without leading zeroes, such as “1 June 2026”.

9. Use one monthly period for each calendar month from September to June. Combine July and August into one period, “1 July – 31 August [YEAR]”. Move the displayed monthly leaderboard to the next period automatically after the current period ends.

10. Allow staff to create and manage more than one school year. For each school year, include September, October, November, December, January, February, March, April, May, June and the combined July–August period. Also include separate annual and S6-finalisation periods when required.

11. Let authorised staff edit every award period’s start date, end date, learning targets, prize text, publication state and Show S6 setting. Adding the same school year again must not duplicate periods, erase edits or unpublish existing results.

12. For monthly Vocab Challenge awards, require both Days With Exercise Done ≥ [MINIMUM DAYS, FOR EXAMPLE 25] and First Attempted Words ≥ [MINIMUM WORDS, FOR EXAMPLE 125]. For the July–August period, allow separate targets such as [JULY–AUGUST MINIMUM DAYS] and [JULY–AUGUST MINIMUM WORDS].

13. Rank eligible monthly award students by Days With Exercise Done, then First Attempted Words, then All Attempted Words. Select the top [NUMBER OF MONTHLY WINNERS, FOR EXAMPLE 5] in each form and include every student tied at the final winning rank.

14. Create separate award lists for the Annual Top 20, Wordsmith top three and S6 Finalisation. Recalculate official award results from the exact competition-period data rather than copying the current leaderboard snapshot, so later corrections to the source data can be included.

15. Use [MONTHLY PRIZE, FOR EXAMPLE “$50 book coupon”] as the default prize for monthly and July–August awards. Do not add a certificate unless I explicitly request one. Keep the S6 Finalisation prize and annual or Wordsmith prize tiers separate.

16. On the public awards page, provide a school-year or period selector and show all applicable forms together. Show S6 only when the selected period allows it. Provide clear states for not generated, no eligible winners and not yet published.

17. Put the period, eligibility, ranking and prize information in a collapsible card. Make the competition-period value, minimum days, minimum first-attempted words and prize text especially prominent. Keep dates free of leading zeroes.

18. Make awards tables readable on phones without horizontal scrolling. English and Chinese names must wrap when needed, and the Chinese Name column must remain visible. Align column widths across tables on tablets and desktops.

19. Add a Print button to the awards page. Produce a clear single-page portrait A4 layout when the content can fit legibly. Hide navigation, selectors, buttons and the footer in print, but keep the school header, criteria and complete winner tables.

20. Read SolidMemory data without changing it. Assemble each student record from the supplied roster, exercise-record and vocabulary-status data, or from the report fields supplied to you. Never create, update or delete SolidMemory records.

21. Store successful leaderboard snapshots in a database. Retain enough earlier snapshots to calculate rank changes and diagnose refresh problems. Do not fetch the remote report separately for every visitor.

22. Refresh the public leaderboards automatically at approximately [MORNING REFRESH TIME] and [EVENING REFRESH TIME] Hong Kong time. Support separate morning and evening report sources if needed, with a safe fallback when one source is unavailable.

23. Provide an authorised Manual Refresh action and an audit log showing the trigger, time and outcome of each refresh. A partial source failure must not be reported as a full success.

24. Generate each award period automatically five minutes after its configured end time. Keep one future award-generation schedule that moves to the next relevant period after each run or period edit. Use a safe recovery run when no future period is configured. Generation must be repeatable without duplicating winners.

25. Do not publish newly generated awards automatically. Allow authorised staff to review, publish and unpublish each period.

26. Protect the admin area with sign-in and server-side owner or administrator checks. Hiding the admin link is not sufficient protection. After sign-in, return the user to the admin page they requested.

27. In the admin area, allow authorised staff to edit report-source settings, dates, targets, prizes, S6 visibility and school years; run manual refreshes; inspect logs; generate awards; and publish or unpublish results.

28. Store all saved timestamps as UTC values. Convert them to and from Hong Kong time for display and date-entry controls. Treat each end date as 23:59:59 Hong Kong time rather than rounding it into the next day.

29. Use the supplied logo and [PRIMARY BRAND COLOUR]. Serve the permanent logo as a normal static website asset so it does not depend on an expiring signed link or redirect. Add useful alternative text.

30. Make the site mobile-first, keyboard accessible and easy to scan. Use clear loading, empty and error states. Keep ranking explanations collapsible. Scope Wordsmith-only spacing or styling changes to the Wordsmith section so the monthly and annual pages retain their own layout.

31. Keep a task checklist while building. Add automated tests for parsing, ranking orders, zero-activity filtering, ties, rank changes, period labels, date conversion, S6 visibility, award selection, repeatable school-year creation and admin access.

32. Before each delivery, run the full tests and code checks. Inspect the website at phone, tablet and desktop widths. Check the printed awards page separately. Save a restorable version and keep the source repository updated without committing secrets or student exports.

### Output
If you can build database-backed web applications, provide a working project with the database structure, secure settings, scheduled jobs, automated tests and a reviewable preview. Do not publish it publicly until I approve it.

If you cannot build or host the website, provide an organised code package or, at minimum, a complete specification containing:
- the page structure and user journeys;
- the database tables and data fields;
- the ranking and award calculations;
- the API or report-reading approach;
- the admin permissions;
- the scheduled update logic;
- the responsive and print requirements;
- the required automated tests; and
- clear setup and deployment steps with secret names but no secret values.

Use British English.

### Check before delivery
Check that:
- the monthly, annual and Wordsmith ranking orders exactly match the stated rules;
- monthly students with zero in-period activity are excluded even when All Attempted Words is non-zero;
- Wordsmith places 4–10 are visible as runners-up but only places 1–3 are presented as award winners;
- September is present and July–August is a single combined period;
- official awards are recalculated from the exact period data and include ties at the final monthly winning rank;
- editing or recreating a school year preserves important dates, edits and publication states;
- all Hong Kong dates, end-of-day boundaries and schedule times are correct;
- monthly prize text does not mention a certificate unless requested;
- Chinese names remain visible on a phone and award tables align on larger screens;
- the print version is complete and legible;
- the permanent logo loads directly and reliably;
- admin actions and scheduled endpoints are protected on the server;
- no password, token, private link or identifiable student export appears in source control or the delivery notes; and
- tests and visual checks have genuinely been completed.

If you cannot read an attached file, create the requested output, use a database or scheduler, run a required check, or verify a layout, say so before proceeding. Offer the closest useful alternative. Do not claim to have completed something you cannot verify.

Ask one focused question only if an essential input is missing. Otherwise, proceed.
```

## Before you use the result with students

- Compare a sample of names, classes, groups and figures with the original SolidMemory data before publication.
- Confirm the active period, learning targets, number of winners, prize wording and S6 setting with the staff member responsible for the competition.
- Test the public pages and admin sign-in on a phone, tablet and desktop. Print the awards page once before using it for a school display.

## If your AI assistant cannot make the file you want

Ask for the page plan, database design, ranking rules and source code as separate editable Markdown sections. You can then pass this package to a developer or to an assistant that can build and host a secure database-backed website.

## What you can change

You may change the school name, year groups, targets, winner counts, prizes, refresh times, colours and S6 arrangements shown in square brackets. Keep the privacy rules, zero-activity check, exact ranking order, Hong Kong time handling, server-side access control and final testing unless your official competition rules require a deliberate change.
