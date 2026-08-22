// ─────────────────────────────────────────────────────────────────
// Firebase client integration — Spark (free tier) version.
// No Cloud Functions. Everything runs from the browser using
// Firestore directly + Anonymous Authentication (both free).
//
// SETUP: paste your firebaseConfig below (Firebase console →
// Project Settings → General → Your apps). This is safe to expose
// publicly — see SETUP.md for why.
// ─────────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey: "AIzaSyBf6pE1sJGYwqV05yi_ydUx9XUKWfDd3uw",
  authDomain: "coach-drill-library.firebaseapp.com",
  projectId: "coach-drill-library",
  storageBucket: "coach-drill-library.firebasestorage.app",
  messagingSenderId: "698299003693",
  appId: "1:698299003693:web:32b016e61789028d0619a4",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const TEAM_STORAGE_KEY = "drillapp_team";

// ─── Anonymous auth: needed only so Firestore rules have a
// request.auth to check != null. Not real identity. ───────────────
let authReadyPromise = null;
function ensureSignedIn() {
  if (!authReadyPromise) {
    authReadyPromise = new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) { resolve(user); return; }
        auth.signInAnonymously().then((cred) => resolve(cred.user)).catch(reject);
      });
    });
  }
  return authReadyPromise;
}

// ─── Local team state ──────────────────────────────────────────
function getStoredTeam() {
  try {
    const raw = localStorage.getItem(TEAM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
function storeTeam(teamId, teamName, code) {
  localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify({ teamId, teamName, code }));
}
function clearStoredTeam() {
  localStorage.removeItem(TEAM_STORAGE_KEY);
}

// ─── Code / alias helpers ───────────────────────────────────────
const CODE_WORDS = ["FALCON","HORNET","TIGER","EAGLE","WOLF","PANTHER","COBRA","VIPER","ROCKET","THUNDER"];

function generateCode() {
  const word = CODE_WORDS[Math.floor(Math.random() * CODE_WORDS.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${word}-${num}`;
}

function normalizeCode(code) {
  return code.trim().toUpperCase();
}

// The alias document ID IS the normalized code — Firestore doc IDs
// are just strings, so "FALCON-4821" works directly as a key. No
// hashing needed here: the alias->teamId mapping is public by
// design (see firestore.rules comment), so obscuring the alias
// itself would add nothing.
function aliasDocId(code) {
  return normalizeCode(code);
}

function generateTeamId() {
  // A long random ID — this is the actual secret in the Spark
  // design. crypto.randomUUID() is available in all modern
  // mobile/desktop browsers.
  return crypto.randomUUID();
}

// ─── Core actions ───────────────────────────────────────────────

async function fbCreateTeam(teamName) {
  await ensureSignedIn();
  const name = teamName.trim();
  if (!name) throw new Error("Team name is required.");

  const teamId = generateTeamId();
  const code = generateCode();

  await db.collection("teams").doc(teamId).set({
    name,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  await db.collection("teamAliases").doc(aliasDocId(code)).set({
    teamId,
    teamName: name,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  storeTeam(teamId, name, code);
  return { teamId, teamName: name, code };
}

async function fbJoinTeam(code) {
  await ensureSignedIn();
  const alias = normalizeCode(code);
  if (!alias) throw new Error("Enter a code.");

  const aliasDoc = await db.collection("teamAliases").doc(alias).get();
  if (!aliasDoc.exists) {
    throw new Error("That code doesn't match a team.");
  }
  const { teamId, teamName } = aliasDoc.data();
  storeTeam(teamId, teamName, alias);
  return { teamId, teamName };
}

async function fbRestoreSession() {
  await ensureSignedIn();
  return getStoredTeam();
}

function fbSignOutTeam() {
  clearStoredTeam();
}

async function fbRegenerateCode(teamId) {
  await ensureSignedIn();
  const stored = getStoredTeam();
  if (!stored || stored.teamId !== teamId) {
    throw new Error("Not currently signed in to this team.");
  }

  const newCode = generateCode();
  await db.collection("teamAliases").doc(aliasDocId(newCode)).set({
    teamId,
    teamName: stored.teamName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  // Best-effort cleanup of the old alias. Rules disallow update/delete
  // on aliases from the client by design (immutability), so the old
  // alias document is intentionally left in place — it still resolves
  // to the same teamId. This means regenerating does NOT invalidate
  // the old code on Spark (a real limitation vs. Blaze). Document
  // this clearly for the coach in the UI (see SETUP.md).
  storeTeam(teamId, stored.teamName, newCode);
  return newCode;
}

// ─── Session CRUD ────────────────────────────────────────────────

async function fbSaveSession(teamId, session) {
  await ensureSignedIn();
  const sessionsRef = db.collection("teams").doc(teamId).collection("sessions");
  if (session.id) {
    await sessionsRef.doc(session.id).update({
      name: session.name,
      date: session.date,
      drills: session.drills,
      notes: session.notes || "",
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return session.id;
  } else {
    const docRef = await sessionsRef.add({
      name: session.name,
      date: session.date,
      drills: session.drills,
      notes: session.notes || "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return docRef.id;
  }
}

async function fbListSessions(teamId) {
  await ensureSignedIn();
  // No orderBy here deliberately: Firestore's orderBy silently excludes
  // documents where the ordered field is null/missing, which would hide
  // template sessions (saved without a date). Sorting happens client-side
  // in the app instead, where null dates can be handled explicitly.
  const snap = await db.collection("teams").doc(teamId).collection("sessions").get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

async function fbDeleteSession(teamId, sessionId) {
  await ensureSignedIn();
  await db.collection("teams").doc(teamId).collection("sessions").doc(sessionId).delete();
}

async function fbShareSession(teamId, sessionId) {
  await ensureSignedIn();
  const sessionDoc = await db.collection("teams").doc(teamId).collection("sessions").doc(sessionId).get();
  if (!sessionDoc.exists) throw new Error("Session not found.");
  const session = sessionDoc.data();

  const shareRef = db.collection("sharedSessions").doc();
  await shareRef.set({
    name: session.name,
    date: session.date,
    drills: session.drills,
    sharedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  return `${window.location.origin}/s/${shareRef.id}`;
}

async function fbGetSharedSession(shareId) {
  const doc = await db.collection("sharedSessions").doc(shareId).get();
  if (!doc.exists) return null;
  return doc.data();
}

window.DrillAppCloud = {
  getStoredTeam,
  createTeam: fbCreateTeam,
  joinTeam: fbJoinTeam,
  restoreSession: fbRestoreSession,
  signOutTeam: fbSignOutTeam,
  regenerateCode: fbRegenerateCode,
  saveSession: fbSaveSession,
  listSessions: fbListSessions,
  deleteSession: fbDeleteSession,
  shareSession: fbShareSession,
  getSharedSession: fbGetSharedSession,
};
