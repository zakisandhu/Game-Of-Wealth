# Game of Wealth

A browser-native, gamified wealth journey planner. Pick your stage, choose an archetype, log your moves, and earn coins as you compound progress.

## Features

- 🎮 **Interactive blueprint tracker** – tick off actions, log KPIs, and watch your mastery bar fill up.
- 🔥 **Daily quests & streaks** – stay motivated with rotating challenges and streak-based coin rewards.
- 💡 **Free inspiration API** – pull instant advice using the [Advice Slip API](https://api.adviceslip.com/).
- 🪙 **Coins, XP, and badges** – gamified feedback for every completed task.
- 🔁 **Offline-friendly sync** – export/import your progress with shareable codes. No database or paid services required.

## Getting started

1. Serve the files locally (or open `index.html` directly in a modern browser).
   ```bash
   # any static server works
   npx serve
   # or
   python -m http.server
   ```
2. Visit the local URL (usually <http://localhost:3000> or <http://localhost:8000>).
3. Start playing! Your progress is stored in `localStorage` and can be shared via sync codes.

## Syncing progress

- **Export**: Click **Copy Progress Code** to copy a base64 string containing your data.
- **Import**: Paste the code into the textarea and press **Import Code**.
- Codes work entirely offline—share them however you like to stay in sync across devices.

## Tech stack

- Vanilla JavaScript (ES modules)
- Modern CSS with glassmorphism styling
- Advice Slip public API for free daily inspiration
- Browser `localStorage` for persistence

## Contributing

Feel free to extend the archetypes, add new quests, or wire in additional free APIs to make the journey even richer.
