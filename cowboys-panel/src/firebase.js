import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD8f8zjLhy3pM0LkgUEkqMaqKL-ITe3CeM",
  authDomain: "cowboys-ac0fa.firebaseapp.com",
  databaseURL: "https://cowboys-ac0fa-default-rtdb.firebaseio.com",
  projectId: "cowboys-ac0fa",
  storageBucket: "cowboys-ac0fa.firebasestorage.app",
  messagingSenderId: "989771881349",
  appId: "1:989771881349:web:237972a817587a0f2cc2ec"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const storage = {
  async get(key) {
    try {
      const snapshot = await get(ref(db, key));
      if (snapshot.exists()) return { value: JSON.stringify(snapshot.val()) };
      return null;
    } catch (e) { console.error("Firebase get error:", e); return null; }
  },
  async save(key, data) {
    try { await set(ref(db, key), data); }
    catch (e) { console.error("Firebase set error:", e); }
  },
  subscribe(key, callback) {
    return onValue(ref(db, key), (snapshot) => {
      if (snapshot.exists()) callback(snapshot.val());
    });
  }
};
