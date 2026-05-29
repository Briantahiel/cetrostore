import "server-only";

import { readFileSync } from "node:fs";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

type FirebaseServiceAccount = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

type GoogleServiceAccountJson = {
  project_id?: string;
  client_email?: string;
  private_key?: string;
  projectId?: string;
  clientEmail?: string;
  privateKey?: string;
};

let firestoreSettingsApplied = false;

const normalizeServiceAccount = (
  serviceAccount: GoogleServiceAccountJson,
): FirebaseServiceAccount | null => {
  const projectId = serviceAccount.projectId ?? serviceAccount.project_id;
  const clientEmail = serviceAccount.clientEmail ?? serviceAccount.client_email;
  const privateKey = serviceAccount.privateKey ?? serviceAccount.private_key;

  if (!projectId || !clientEmail || !privateKey) return null;

  return {
    projectId: projectId.trim(),
    clientEmail: clientEmail.trim(),
    privateKey: privateKey
      .trim()
      .replace(/^["']|["']$/g, "")
      .replace(/\\n/g, "\n"),
  };
};

const getServiceAccountFromBase64 = () => {
  const encodedServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64?.trim();

  if (!encodedServiceAccount) return null;

  try {
    const serviceAccount = JSON.parse(
      Buffer.from(encodedServiceAccount, "base64").toString("utf8"),
    ) as GoogleServiceAccountJson;

    return normalizeServiceAccount(serviceAccount);
  } catch {
    return null;
  }
};

const getServiceAccountFromFile = () => {
  const serviceAccountPath = (
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ??
    process.env.GOOGLE_APPLICATION_CREDENTIALS ??
    ""
  ).trim();

  if (!serviceAccountPath) return null;

  try {
    const serviceAccount = JSON.parse(
      readFileSync(serviceAccountPath, "utf8"),
    ) as GoogleServiceAccountJson;

    return normalizeServiceAccount(serviceAccount);
  } catch {
    return null;
  }
};

const getServiceAccountFromEnv = () => {
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) return null;

  return normalizeServiceAccount({ projectId, clientEmail, privateKey });
};

export const getFirebaseServiceAccount = () =>
  getServiceAccountFromBase64() ??
  getServiceAccountFromFile() ??
  getServiceAccountFromEnv();

export const hasFirebaseConfig = () => Boolean(getFirebaseServiceAccount());

export const getFirebaseConfigStatus = () => {
  const serviceAccount = getFirebaseServiceAccount();

  return {
    hasProjectId: Boolean(serviceAccount?.projectId),
    hasClientEmail: Boolean(serviceAccount?.clientEmail),
    hasPrivateKey: Boolean(serviceAccount?.privateKey),
    privateKeyHasBeginMarker: Boolean(
      serviceAccount?.privateKey.includes("-----BEGIN PRIVATE KEY-----"),
    ),
    privateKeyHasEndMarker: Boolean(
      serviceAccount?.privateKey.includes("-----END PRIVATE KEY-----"),
    ),
  };
};

export const getFirebaseDb = () => {
  const serviceAccount = getFirebaseServiceAccount();

  if (!serviceAccount) {
    throw new Error("Firebase no esta configurado.");
  }

  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: serviceAccount.projectId,
        clientEmail: serviceAccount.clientEmail,
        privateKey: serviceAccount.privateKey,
      }),
    });
  }

  const db = getFirestore();

  if (!firestoreSettingsApplied) {
    db.settings({ ignoreUndefinedProperties: true });
    firestoreSettingsApplied = true;
  }

  return db;
};
