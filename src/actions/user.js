import db, {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  setDoc,
  getDoc,
  doc,
  googleProvider,
  facebookProvider,
} from "../firebase";
import { userActions } from "../slices/user-slice";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { uiActions } from "../slices/ui-slice";

export const emailSignUpAPI = (email, password) => {
  return async (dispatch) => {
    dispatch(uiActions.toggle())
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const data = {
        id: userCredentials.user.uid,
        email: userCredentials.user.email,
        isAdmin: false,
      };
      console.log(data);
      dispatch(userActions.setUser(data));
      await setDoc(doc(db, "users", userCredentials.user.uid), data);
      dispatch(getAuthenticationStatus());
    } catch (error) {
      console.log(error);
      dispatch(uiActions.setNotification(error.message));
    }
    dispatch(uiActions.toggle());
  };
};

export const emailSignInAPI = (email, password) => {
  return async (dispatch) => {
    dispatch(uiActions.toggle());
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const data = {
        id: result.user.uid,
        email: result.user.email,
      };
      dispatch(userActions.setUser(data));

      await setDoc(doc(db, "users", result.user.uid), data);
      dispatch(getAuthenticationStatus());
    } catch (error) {
      dispatch(uiActions.setNotification(error.message));
    }
    dispatch(uiActions.toggle());
  };
};

export const getAuthenticationStatus = () => {
  return async (dispatch) => {
    //   dispatch(uiActions.toggle())
    try {
      await onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const { email } = docSnap.data();
            const data = {
              id: user.uid,
              email: email,
            };
            console.log(data);
            dispatch(userActions.setUser(data));
            dispatch(userActions.setAuthentication(true));
          }
        } else {
          dispatch(userActions.setAuthentication(false));
        }
      });
    } catch (error) {
      dispatch(uiActions.setNotification(error.message));
    }
    // dispatch(uiActions.toggle())
  };
};
