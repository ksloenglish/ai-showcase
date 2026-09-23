# Pokémon-Style Vocabulary Cards

## What this makes

This prompt creates a set of polished **1080 × 1350 px vocabulary cards** for Secondary 2 learners. Each card presents one target item, its English and Traditional Chinese definitions, an example sentence, a CEFR label where supplied, and a memorable original creature illustration.

## What you need

- A vocabulary list, spreadsheet, document, or pasted text containing the target item, part of speech, English definition, Traditional Chinese definition, example sentence, and CEFR level where available.
- The unit label for the set, such as `[S2 Unit 5 Text 1]`.
- An optional school logo, editable card template, or visual reference if you want the cards to follow an established look.
- The settings you may want to change: `[YEAR GROUP]`, `[NUMBER OF CARDS]`, `[CARD ORIGIN LABEL]`, and whether a supplied school logo should appear.

## How to use it

1. Prepare the vocabulary material and any optional template, logo, or reference image.
2. Open your chosen AI assistant and attach or paste the material.
3. Copy the whole prompt below. Change only the words in `[SQUARE BRACKETS]` if needed.
4. Send the prompt. Check the card-content table and open a sample of the finished cards before using them with students.

## Copy-and-paste prompt

```text
You are helping me create a set of Pokémon-style English vocabulary cards for [YEAR GROUP] learners in Hong Kong.

### Materials
I have provided: [DESCRIBE THE VOCABULARY LIST, ATTACHMENTS, OPTIONAL LOGO, TEMPLATE, OR VISUAL REFERENCE].

Use only the vocabulary information you can read from these materials. Keep every target item exactly as given, including forms such as “be”, “sb”, and “sth”. Do not silently correct, expand, replace, or omit any source item. Use British English in all new English writing.

### Task
Create exactly [NUMBER OF CARDS] separate cards for [CARD ORIGIN LABEL], with one card for every source item in the original source order. Each completed card must be a 1080 × 1350 px PNG in a 4:5 portrait format.

Use a polished Pokémon-style collectible-card look, while making all creatures, scenes, and artwork original. Do not use recognisable existing characters, copyrighted logos, or names from a game or franchise.

### Requirements
1. Include the target word or phrase as the title. Italicise only “be”, “sb”, and “sth” when they appear in a phrase title. Include a part-of-speech badge without a final full stop, and add a separate CEFR badge only when the source provides a CEFR level.

2. Include the English definition, Traditional Chinese definition, and example sentence exactly as supplied. Include the card origin, card number in the form “001/[NUMBER OF CARDS]”, HP, and a clear rarity badge. Include a school logo only when I have attached it and explicitly asked you to use it.

3. Calculate HP from Scrabble tile values. Ignore spaces, hyphens, and apostrophes. For words that have -ise/-ize variants, use the z spelling for the HP calculation only; keep the supplied spelling on the visible title. Use these values: A, E, I, O, U, L, N, S, T and R = 1; D and G = 2; B, C, M and P = 3; F, H, V, W and Y = 4; K = 5; J and X = 8; Q and Z = 10. Multiply the total by 10.

4. Assign rarity as follows: SAR for HP 420 or above; UR for 380–419; SR for 280–379; AR for 230–279; R for 200–229; U for 130–199; and C for below 130. Treat these tiers as a fun game feature, not as a measure of vocabulary difficulty.

5. Generate one new illustration for each item. If your image-generation settings allow a model choice, use GPT-Image-2 rather than an automatic model selection.

6. Every illustration must be a true 4:5 portrait image that fills the canvas edge to edge. Do not allow white margins, blank side bars, padding, letterboxing, card frames, borders, text, letters, numbers, logos, symbols, speech bubbles, game statistics, or interface elements within the illustration.

7. Start every illustration instruction with this wording: “Pure illustration artwork only — no card frame, no border, no HP text, no game statistics, no logos, no user-interface elements, no speech bubbles, and no text, letters, numbers, or symbols anywhere in the image. Scene art fills the complete canvas edge to edge with no white space or padding.”

8. For Common, Uncommon, and Rare cards, place the creature in the lower half of the image, sitting or standing on the ground. Show its whole head and face clearly in the middle of the artwork. Use the top quarter for background only, so that the illustration container does not crop the face.

9. For Art Rare, Super Rare, Ultra Rare, and Special Art Rare cards, place the creature’s head and upper body in the middle third of the artwork. Keep the top quarter open for background and the bottom quarter for the ground or environment, so that header and footer overlays do not cover the subject.

10. Illustrations should use vivid anime-inspired colour, dynamic lighting, cel shading, strong outlines, and a detailed environment that visibly helps learners understand the target item.

11. Use a consistent card layout throughout the set. Cards rated C, U, or R must place the illustration in a rounded container between opaque header and footer areas. Cards rated AR, SR, UR, or SAR must use full-bleed scene art with semi-transparent header and footer areas placed over it. Keep text, badges, panels, numbering, and the optional logo aligned consistently and easy to read on a phone screen.

### Output
First, provide a concise card-content table showing the card number, item, part of speech, CEFR level where supplied, HP, and rarity for every card. Then provide all completed 1080 × 1350 px PNG cards and a ZIP file containing the complete set.

### Check before delivery
Check that:
- there is exactly one finished card for each supplied item, in the same source order;
- every title, English definition, Traditional Chinese definition, example sentence, and CEFR label matches the supplied material, with no invented CEFR level;
- every HP score and rarity tier follows the stated rules;
- every illustration is a genuine 4:5 portrait image and fills its container with no white space or blank strips at either side;
- “be”, “sb”, and “sth” are italicised only in titles where they appear;
- C, U, and R cards show the creature’s complete face without cropping, while AR, SR, UR, and SAR cards keep the key subject clear of header and footer overlays;
- the card number, HP, rarity label, text panels, badges, and any requested logo are consistent, well aligned, and readable;
- at least one completed card from every rarity tier used in the set has been visually checked before delivery.

If you cannot read the source material, create PNG cards, create a ZIP file, use GPT-Image-2, or check the finished layout, say so before proceeding. Offer the closest useful alternative, such as the card-content table, card text, a set of image prompts, and editable layout instructions. Do not claim to have created or checked something you cannot do.

Ask one focused question only if an essential input is missing. Otherwise, proceed.
```

## Before you use the result with students

Check that the output uses the exact vocabulary material you provided, including phrases that contain **be**, **sb**, or **sth**. Confirm the card count, source order, definitions, example sentences, CEFR labels, HP scores, and rarity labels.

Open several finished cards before sharing them. Where possible, inspect one card with a boxed illustration and one with full-bleed artwork. Check that no illustration has a white strip at the left or right edge and that the creature’s face has not been cropped.

## If your AI assistant cannot make the file you want

Ask it for the card-content table, the card text, and one image prompt for each vocabulary item. You can then generate the illustrations separately and place the material into an editable card template. If it cannot create a ZIP file, ask for the individual PNG cards instead.

## What you can change

You may change `[YEAR GROUP]`, `[NUMBER OF CARDS]`, `[CARD ORIGIN LABEL]`, the vocabulary source, the use of a school logo, and the visual reference or template. Keep the exact source wording, the 4:5 edge-to-edge illustration requirement, the GPT-Image-2 preference, the HP-and-rarity rules, and the final visual checks unchanged because they protect the quality and consistency of the card set.
