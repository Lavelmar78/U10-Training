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

const TEAMS_STORAGE_KEY = "drillapp_teams";       // array of {teamId, teamName, code}
const ACTIVE_TEAM_STORAGE_KEY = "drillapp_active_team"; // teamId string

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

// ─── Local team state — supports belonging to multiple teams ──────
function getJoinedTeams() {
  try {
    const raw = localStorage.getItem(TEAMS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveJoinedTeams(teams) {
  localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(teams));
}

function addOrUpdateJoinedTeam(teamId, teamName, code) {
  const teams = getJoinedTeams();
  const existing = teams.findIndex((t) => t.teamId === teamId);
  const entry = { teamId, teamName, code };
  if (existing >= 0) {
    teams[existing] = entry; // refresh name/code in case they changed
  } else {
    teams.push(entry);
  }
  saveJoinedTeams(teams);
}

function removeJoinedTeam(teamId) {
  const teams = getJoinedTeams().filter((t) => t.teamId !== teamId);
  saveJoinedTeams(teams);
  if (getActiveTeamId() === teamId) {
    // Fall back to whichever team is now first in the list, or none.
    setActiveTeamId(teams.length ? teams[0].teamId : null);
  }
}

function getActiveTeamId() {
  return localStorage.getItem(ACTIVE_TEAM_STORAGE_KEY);
}

function setActiveTeamId(teamId) {
  if (teamId) {
    localStorage.setItem(ACTIVE_TEAM_STORAGE_KEY, teamId);
  } else {
    localStorage.removeItem(ACTIVE_TEAM_STORAGE_KEY);
  }
}

function getStoredTeam() {
  // Returns the currently ACTIVE team, or null if none joined yet —
  // kept for backward compatibility with existing app code that
  // expects "the current team" as a single object.
  const activeId = getActiveTeamId();
  const teams = getJoinedTeams();
  if (!teams.length) return null;
  const active = teams.find((t) => t.teamId === activeId);
  return active || teams[0]; // fall back to first joined team if active pointer is stale
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

  addOrUpdateJoinedTeam(teamId, name, code);
  setActiveTeamId(teamId);
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
  addOrUpdateJoinedTeam(teamId, teamName, alias);
  setActiveTeamId(teamId);
  return { teamId, teamName };
}

async function fbRestoreSession() {
  await ensureSignedIn();
  return getStoredTeam();
}

function fbListJoinedTeams() {
  return getJoinedTeams();
}

function fbSwitchTeam(teamId) {
  const teams = getJoinedTeams();
  const match = teams.find((t) => t.teamId === teamId);
  if (!match) throw new Error("Not currently joined to that team.");
  setActiveTeamId(teamId);
  return match;
}

function fbLeaveTeam(teamId) {
  removeJoinedTeam(teamId);
}

function fbSignOutTeam() {
  // "Sign out" in the multi-team model means: leave the currently
  // active team (removes it from the joined list). This matches the
  // existing "Leave Team" button in the app. Switching teams (without
  // leaving) is a separate action — see fbSwitchTeam.
  const active = getStoredTeam();
  if (active) removeJoinedTeam(active.teamId);
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
  listJoinedTeams: fbListJoinedTeams,
  switchTeam: fbSwitchTeam,
  leaveTeam: fbLeaveTeam,
};
