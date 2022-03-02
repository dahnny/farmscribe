import db, {
  setDoc,
  getDoc,
  doc,
  collection,
  addDoc,
  getDocs,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteDoc,
} from "../firebase";
import productSlice from "../slices/product-slice";
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
