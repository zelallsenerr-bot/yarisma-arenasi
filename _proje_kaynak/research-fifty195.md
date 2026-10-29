# 50 Sarışın · revision 195 · 23 October 2026

Implemented user-specified rules. The user confirmed the final continues the same question/selection mechanic until all last three rivals are eliminated. The app explicitly states its final budget of ten new questions / three errors, matching the second section's limits; this is the adaptation's stated rule, not a verified historical final rule.

## Rules cross-check

Historical episode transcripts (not copied into the game):
- https://www.dailymotion.com/video/x9ycu1g — women write concealed answers first; player answers and selects women until one correct answer; only used board question replaced; third error loses bank.
- https://www.dailymotion.com/video/x9kpv82 — failure to double retains previous bank; 25 eliminations minimum; three remaining women / take-or-risk decision; ten questions.
- https://www.dailymotion.com/video/x9jhot0 — category/question rejection before choices.
- https://www.c21media.net/news/eyeworks-blondes-find-new-homes/ — Turkish format commission on Fox, contemporary report December 2008. Existing 2008–2009 period introduction preserved.

## Question bank

50 categories, exactly 500 distinct question texts each, 25,000 unique IDs.
24 factual categories use normalized existing Arena facts, direct knowledge questions and distinct two-fact matching combinations; 26 scenario categories use deterministic varied numerical conditions. These are not 25,000 manually researched individual trivia facts. Option permutations do not increase the count. The in-app rules and content notes describe the question types.

`tools/build-fifty195.py` reads retained banks and writes `dist/games/elli-sarisin/facts195.json`; `bank195.js` builds the full deck in memory. No runtime dependency on an external trivia service. Tests verify all categories, unique texts, four distinct answer options and complete explanations. Previous exposure is recorded locally. The bank stays small enough for the existing static hosting limit.

## Character assets

Built-in Imagegen, fictional adult contestants, cropped contact sheet into 50 WebP portraits at `dist/games/elli-sarisin/assets/contestant-00.webp` through `contestant-49.webp`. Names, original staircase numbers and portrait identities survive both rounds and reloads. Portraits are fictional, not actual TV participants. Existing real programme opening photo unchanged.

Prompt: “Use case: photorealistic-natural. Project asset: contact sheet for a Turkish quiz game, 50 fictional adult female contestants, every one clearly BLONDE. Create one large landscape sheet with EXACTLY 10 columns and 5 rows of equally sized individual photographic portraits, no gutters. Each cell: one DIFFERENT woman centered from head to mid-torso, full hair visible within her own cell, natural studio lighting, navy studio backdrop. All 50 adult women must have visibly blond hair; a wide mix of honey blonde, platinum, golden, ash, strawberry blonde, short bobs, curly hair, straight long hair, braids, updos, waves. Distinct facial identities, ages 25–65, skin tones, face shapes, body types, varied modest colorful everyday or evening tops. Camera frontal portrait with natural expression. No repeated face, no man, no brunette, no black hair, no children. Strict uniform ten-by-five grid, each face centered exactly in its rectangular cell, no overlaps between cells. No text, numbers, badges, logos, watermark. Target image high resolution 3840x2160 or largest available so all fifty distinct faces can be cropped for game portraits.”

## Validation

- `node tests/fifty195.cjs`: 25,000 questions; seven-person row order; preview/back; concealed precommitted AI; wrong first-round continuation; row rate earnings; double bank; 25-elimination gate; unchanged board slots; three errors; ten-question boundary including all selections on question ten; final risk/take/win/loss; AI level differences.
- `node tests/fifty195-ui.cjs`: event bindings for pagination, category preview, choices, result, continue, local save/resume, manual pause, typed classic answer, selection, final decision.
- `node tests/lifecycle193.cjs`: shared background/recovery behavior on all75 entrypoints.
- `node tests/rewards194.cjs`, `node tests/gonder194.cjs`: adjacent shared reward/catalog regressions.
- JS syntax checks.

No browser / physical-device visual test performed in this environment.

## Revision 196 corrections

User clarified: the stored pool has 50 categories, but only 10 randomly selected categories appear per new match, with no pagination through the other 40. Selected IDs are persisted for resume and reused throughout that match. Existing saves without a category set get one stable set on first load.

User clarified: a wrong player answer in part one preserves every opponent in that row regardless of her own answer. Only a correct player answer eliminates wrong-answer opponents. Earnings are zero on wrong player answers. The 25-elimination eligibility counter uses actual eliminations. Old first-round saves restore any incorrectly eliminated wrong-player-answer rows; part-two games already in progress retain their existing state.

Validation adds 200 new-match category selections (exactly10 unique each, pool coverage50), hidden-category rejection, stable resume, an all-wrong-rivals/wrong-player row, wrong-row survivors carried to part2, and old first-round save repair.

## Revision 197 category lock

A category locks as soon as its question is drawn in part1. Its question is cached, not regenerated. Answered categories cannot be replayed. Abandoned previews can be revisited unchanged from a separate pending-question list, preserving the requested pre-choice return without exhausting all available questions and stranding the match. Eight rows use eight distinct categories. Tests cover opening all ten previews, rejecting every new draw, then completing eight rows via the identical cached questions; closed/answered category IDs persist in local saves.

## Revision 198 finite second-section deck

Part2 now reserves exactly10 questions at its start: three visible plus seven waiting. Correct answers replace only the used slot, only while the queue has a question. At seven answered with no errors, the three remaining questions are all visible; the board then shrinks to two and one. Empty slots do not render or accept selection. Wrong-answer X slots and three-error rule remain. Existing late-round saves are capped to their remaining question budget without adding phantom third cards. Reserved questions and queue order survive JSON save/resume. No changes to final rules.

Validation: full10-question path asserts visible3→2→1, queue exhaustion, invariant preselected IDs and no new draws; legacy saves with two/one questions remaining; UI card counts two/one; existing fifty195 rule tests still pass.
