import { updateDoc } from "firebase/firestore/lite";
import db, {
  setDoc,
  getDoc,
  doc,
  collection,
  addDoc,
  getDocs,
  storage,
  ref,
  arrayUnion,
  uploadBytesResumable,
  getDownloadURL,
  deleteDoc,
} from "../firebase";
import productSlice, { productActions } from "../slices/product-slice";
import { uiActions } from "../slices/ui-slice";

export const addProductApi = (productDetails) => {
  return async (dispatch) => {
    try {
      if (productDetails.user) {
        await setDoc(
          doc(db, "products", productDetails.imageHash),
          productDetails
        );
        console.log(productDetails);
      }
    } catch (error) {
      dispatch(uiActions.setNotification(error.message));
      console.log(error);
    }
  };
};

export const getProductApi = (id) => {
  return async (dispatch) => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        console.log(docSnap.data());
        dispatch(productActions.getProduct(docSnap.data()));
      }
    } catch (error) {
      dispatch(uiActions.setNotification(error.message));
    }
    // dispatch(uiActions.toggle())
  };
};

export const addCommentApi = (id, comment) => {
  return async (dispatch) => {
    dispatch(uiActions.toggle());

    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, { comments: arrayUnion(comment) });
      //   dispatch(getProductApi());
    } catch (error) {
      dispatch(uiActions.setNotification(error.message));
    }
    dispatch(uiActions.toggle());
  };
};
