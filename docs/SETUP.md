# Setting up the Firebase backend (Spark / free tier)

This version needs **no billing account** — everything runs on Firebase's permanently-free Spark plan. In exchange, it's slightly less locked-down than the Cloud Functions version (see "What's different" below) — a fair trade for a grassroots app with no personal data involved.

## 1. Create the Firebase project

1. Go to https://console.firebase.google.com → **Add project** → name it → skip Analytics
2. Click the **web icon (`</>`)** to register a web app → copy the `firebaseConfig` object shown

## 2. Enable Firestore

**Build → Firestore Database → Create database** → **production mode** → pick a region close to you (e.g. `europe-west1` for Ireland).

## 3. Enable Anonymous Authentication

**Build → Authentication** (or **☰ menu → Security → Authentication**) → **Get started** → on the Sign-in method tab, enable **Anonymous**. This is the only provider you need — the app uses it just to get a valid `request.auth` for the security rules to check, not for real coach identity.

## 4. Install the Firebase CLI

On a computer (this step needs Node.js — can't be done from a phone browser):

```bash
npm install -g firebase-tools
firebase login
```

## 5. Connect this folder

From the root of this repo (where `firestore.rules` and `firestore.indexes.json` live):

```bash
firebase init firestore
```

Pick your project, and when asked, keep the existing `firestore.rules` and `firestore.indexes.json` (do not overwrite them). This creates the `firebase.json` the deploy step needs.

## 6. Deploy the security rules

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

No Blaze plan, no billing card, no Cloud Functions needed for this step.

No computer with Node.js? Paste the contents of `firestore.rules` into **Firestore Database → Rules** in the console and click **Publish** instead. The indexes file is empty, so there is nothing else to deploy.

## 7. Wire up the app

Open `firebase-client.js`, paste your real `firebaseConfig` values from step 1.

`index.html` already loads the Firebase SDK (app, auth and firestore compat, 10.7.0) and `firebase-client.js`, so there is nothing to add there.

## 8. Deploy the app

```bash
firebase deploy --only hosting
```

You'll get a live URL like `your-project.web.app`. GitHub Pages also works fine for hosting — the Firebase pieces work from any static host.

## What's different vs. the Cloud Functions (Blaze) version

Worth understanding before you rely on this for anything more sensitive than drill plans:

- **No rate limiting on code guesses.** The Blaze version throttled repeated wrong-code attempts server-side. This version can't — Firestore rules have no concept of "attempts over time." A script could try many codes in a row. In practice this only matters if someone is deliberately targeting your team, and the worst case is they see a list of drill names and dates — nothing personal.

- **The team code and the team's real ID are different things.** The code you share (e.g. `FALCON-4821`) is a friendly alias that looks up a long random ID behind the scenes — that ID is the actual access key. This is invisible to you day-to-day; it just means the "code" is really a convenience layer.

- **"Regenerate code" doesn't invalidate the old one.** Since there's no server to delete the old alias safely (Firestore rules can't allow a client to delete just *some* documents in a collection without opening the door to deleting others), regenerating creates an *additional* valid code rather than replacing the old one. If a code leaks somewhere you're not comfortable with, delete its document under `teamAliases` in the Firebase console (the console has admin access, so the rules don't block it).

- **Anonymous auth, not real accounts.** Every visitor gets a throwaway anonymous Firebase identity behind the scenes. This is invisible to coaches and costs nothing — it's just the mechanism that lets Firestore rules require *some* form of "signed in."

None of this matters for what the app actually stores (drill names, categories, session dates) — there's nothing here worth a determined attacker's time. If you ever add anything personal (coach contact details, player names, medical notes, etc.), come back and we should switch to the Blaze/Cloud Functions version, which closes these gaps properly.

## Costs

Genuinely £0/month on Spark, permanently, for this app's scale. Spark's daily limits (50K reads, 20K writes, 20K deletes per day) are far beyond what a handful of teams saving sessions will ever use.
