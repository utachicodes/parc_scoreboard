import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore as _getFirestore } from 'firebase-admin/firestore';

let app;

export function getFirestore() {
  if (!getApps().length) {
    app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } else {
    app = getApp();
  }
  return _getFirestore(app);
} 