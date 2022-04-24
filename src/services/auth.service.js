import * as FirebaseApp from "firebase/app";
import * as FirebaseAuth from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = FirebaseApp.initializeApp(firebaseConfig);
const auth = FirebaseAuth.getAuth(app);

export function signUpWithEmailAndPassword(email, password) {
	return FirebaseAuth.createUserWithEmailAndPassword(auth, email, password);
}

export function signInWithEmailAndPassword(email, password) {
	return FirebaseAuth.signInWithEmailAndPassword(auth, email, password);
}

export function signInWithGoogle() {
	const provider = new FirebaseAuth.GoogleAuthProvider();

	return FirebaseAuth.signInWithPopup(auth, provider);
}

export function signOut() {
	return FirebaseAuth.signOut(auth);
}

export function deleteCurrentUser() {
	return FirebaseAuth.deleteUser(auth.currentUser);
}

export function sendPasswordResetEmail() {
	if (!auth.currentUser) return null;

	return FirebaseAuth.sendPasswordResetEmail(auth, auth.currentUser.email);
}

export function getCurrentUserToken() {
	if (!auth.currentUser) return null;

	return auth.currentUser.getIdToken();
}

export function getCurrentUserUID() {
	if (!auth.currentUser) return null;

	return auth.currentUser.uid;
}
