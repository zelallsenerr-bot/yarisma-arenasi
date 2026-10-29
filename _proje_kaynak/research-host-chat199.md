# Host conversations · revision 199

The existing75 game routes retain their native conversations. A shared optional `Sunucuyla sohbet` entry is placed immediately after each game's header, outside its rerendered game screen. Each route has an authored host/narrator profile, game-specific hook, topic and tactic. Six scripted topics offer two player choices and three host turns. Different player choices change replies. Topic rotation and incomplete conversations persist locally; online shared hosts use the established session-memory storage.

The source manifest and existing audience remain unchanged. No live AI / host chat or extra service was introduced. UI explicitly identifies fictional scripted dialogue. Unknown hosts are described generically rather than assigning an unsupported identity. Existing programme photos, music settings, scoring and rules are retained.

Opening chat adds a named hold to the shared clock and pauses playing media. Closing removes only its own hold; another room/parent/background pause stays active. Existing manual game-pause state is untouched. Media resumes at the same position only after all holds clear and only if the original source is still present. Previously paused videos remain paused. Game key presses are blocked while the dialog is open. Native modal focus, Escape, explicit close and return controls are supported; no chat opens automatically during a live question.

Files: `host-chat-data199.js`, `host-chat199.js`, `host-chat199.css`, `host-chat-audit199.json`, `tools/build-host-chat199.py`. Privacy/credits pages updated for local scripted conversation history.

Validation: `tests/host-chat199.cjs` checks all75 routes and450 topic profiles, choice branch completeness, topic rotation, incomplete-chat restoration, unchanged game scores/questions/manual pause and media position/paused state. `tests/lifecycle193.cjs` adds nested chat/room/background holds to the existing75-route lifecycle checks. Existing Fifty195 rules are checked as an adjacent regression. JavaScript syntax and diff whitespace checks pass. No browser/physical-phone visual verification was performed.

Three older timer loops (Alan, 1 Milyon Canlı Para, Sepetini Koru) now read the pause-aware performance clock instead of Date.now for elapsed deltas; otherwise a long chat would be charged to the first resumed tick. Shared clock regression confirms 60 seconds of chat adds zero time to a delta timer.
