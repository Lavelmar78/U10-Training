# Football Coach Drill Library

A phone-friendly web app for planning and running U10 soccer practices.

- 93 drills in 9 categories (warm-up, defending, attacking, attack v defence, movement, skills, set pieces, training match, goalkeeper). Each drill has a setup, coaching points, cues, an animated diagram and video links.
- Build a session from drills and run it on the field with a timer.
- Create a team, share its join code with other coaches, and save sessions to the team.

The drill library and session builder work offline. Teams and saved sessions need Firebase.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The app: layout, styles, drill animations and the app code. |
| `drills.js` | The drill data: `CATEGORIES`, `DRILLS` and `GLOBAL_CUES`. |
| `firebase-client.js` | Talks to Firebase (anonymous sign-in, teams, sessions). Exposes `window.DrillAppCloud`. |
| `firestore.rules` | Security rules for the Firestore database. |
| `firestore.indexes.json` | Firestore indexes (none needed yet), for deploying with the Firebase CLI. |
| `tools/check-animations.js` | Test script: plays every drill animation for 3 loops and reports errors. |
| `docs/SETUP.md` | Longer Firebase setup walkthrough, including the Firebase CLI route and the Spark-tier trade-offs. |
| `docs/coach-guide.md` | Quick guide to hand to other coaches. |

There is no build step and no dependencies to install. The Firebase SDK loads from Google's CDN.

## Run it locally

Serve the folder with any static web server and open it in a browser:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` straight from disk (`file://`) shows the drills, but Firebase sign-in needs the page served over `http://localhost` or `https://`.

To try it on your phone, use the same Wi-Fi and open `http://<your-computer's-IP>:8000`, or deploy it (below).

## Checking the animations

Each drill's `anim` names a function in `index.html`. A drill can set `animMs` in `drills.js` to change how long one loop takes (default 4000 ms). After editing animations, run:

```sh
npm i -g playwright   # once
node tools/check-animations.js            # add --shots out/ to save a picture strip per drill
```

It fails on script errors, NaN positions, a missing `animSprintSlow`, or non-ASCII SVG text (which crashes some mobile browsers). It warns about players jumping between frames or leaving the pitch.

## Firebase setup

The app uses Firebase on the free **Spark** plan: Firestore plus Anonymous Authentication. There are no Cloud Functions or servers.

1. In the [Firebase console](https://console.firebase.google.com/), create a project (or use the existing `coach-drill-library` one).
2. **Authentication → Sign-in method:** enable **Anonymous**.
3. **Firestore Database:** create a database in production mode.
4. **Firestore Database → Rules:** paste in the contents of `firestore.rules` and publish.
5. **Project settings → General → Your apps:** add a Web app and copy its `firebaseConfig` into the top of `firebase-client.js`.
6. **Authentication → Settings → Authorized domains:** add the domain you host the app on (`localhost` is there by default).

When you change the rules, edit `firestore.rules` here first and then paste them into the console, so the repo stays the source of truth.

### Why the config in `firebase-client.js` is safe to commit

The `apiKey` and the other `firebaseConfig` values only identify the Firebase project. They are not passwords, and every visitor's browser downloads them anyway. What protects the data is `firestore.rules`.

### How team access works

There are no user accounts. Every visitor is signed in anonymously, which only proves the request came from the app.

- Creating a team makes a long random team ID (the real secret) and a short join code like `FALCON-4821`.
- The join code is stored in `teamAliases` and points to the team ID. Anyone who knows the code can join the team and read or edit its sessions.
- Nothing can be listed, so you can't find a team without its code.
- "Create Additional Code" adds a new code, but **old codes keep working**. On the Spark plan the browser can't safely delete codes, so the rules make them permanent. If a code leaks, the only fix today is to create a new team.
- Teams you've joined are remembered in the browser's local storage. Clearing site data on a phone means re-entering the code.

### Data layout

```
teams/{teamId}                 name, createdAt
teams/{teamId}/sessions/{id}   name, date, drills, notes, createdAt/updatedAt
teamAliases/{CODE}             teamId, teamName, createdAt
sharedSessions/{id}            name, date, drills, sharedAt
```

## Deploying

Any static host works (GitHub Pages, Firebase Hosting, Netlify). Upload `index.html`, `drills.js` and `firebase-client.js`, then add the host's domain to Firebase's authorized domains (step 6 above).
