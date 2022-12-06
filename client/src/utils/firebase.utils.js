import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyDthKmhc88SRhWjS1M_HQa2GNtc00UHrew',
  authDomain: 'rate-my-desk-setup.firebaseapp.com',
  projectId: 'rate-my-desk-setup',
  storageBucket: 'rate-my-desk-setup.appspot.com',
  messagingSenderId: '1074487367996',
  appId: '1:1074487367996:web:2a9518addc5953ba7c2639',
  measurementId: 'G-16CCR9S6B1',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)

// GOOGLE SIGN IN
const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid)

  console.log('userDocRef', userDocRef)

  const userSnapshot = await getDoc(userDocRef)

  console.log('additionalInformation', additionalInformation)
  console.log('userSnapshot', userSnapshot)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback)
