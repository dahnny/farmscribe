import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import ipfs from "../ipfs";
import { uiActions } from "../slices/ui-slice";
import { Link } from "react-router-dom";
import { addProductApi } from "../actions/product";

const AddProduct = (props) => {
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const { contract, address, balance } = useSelector((state) => state.contract);

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      console.log("reached");
      toast.error(`not an image, the file is a ${typeof image}`, {
        position: toast.POSITION.BOTTOM_LEFT,
      });

      return;
    }
    setImage(image);
  };

  const formHandler = async (event) => {
    event.preventDefault();
    if (image === "") {
      console.log("empty");
      toast.error("Please add an image for your product", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }
    dispatch(uiActions.toggle());
    try {
      const { path } = await ipfs.add(image);
      if (path) {
        // console.log(path);
        props.createProduct(name, description, path, quantity, price);
        dispatch(
          addProductApi({ user, name, imageHash: path, likes: 0, comments: [] })
        );
      }
    } catch (error) {
      dispatch(uiActions.setNotification(error.message));
    }
    dispatch(uiActions.toggle());
  };

  return (
    <>
      <div
        className="cartOffcanvas offcanvas offcanvas-end"
        tabIndex={-1}
        id="cartOffcanvas"
      >
        <div className="cartOffcanvas_header d-flex align-items-center justify-content-between">
          <h2 className="cartOffcanvas_header-title" id="cartOffcanvasLabel">
            Add Product
          </h2>
          <button
            className="cartOffcanvas_header-close"
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="icon-close" />
          </button>
        </div>
        <div className="cartOffcanvas_body">
          {isAuth ? (
            <>
              <form onSubmit={formHandler} className="cartOffcanvas_body-list">
                <input type="text" className="form-control" name="" id="" />
                <li className="cartOffcanvas_body-list_item d-sm-flex align-items-center">
                  <label htmlFor=""></label>
                  <input
                    className="form_control"
                    type="text"
                    placeholder="Name Of Product"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </li>
                <div className="row" style={{ paddingBottom: "10px" }}>
                  <div className="col-6">
                    <li className="cartOffcanvas_body-list_item d-sm-flex align-items-center">
                      <label htmlFor=""></label>
                      <input
                        className="form_control"
                        type="text"
                        required
                        placeholder="Price"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </li>
                  </div>
                  <div className="col-6">
                    <li className="cartOffcanvas_body-list_item d-sm-flex align-items-center">
                      <label htmlFor=""></label>
                      <input
                        className="form_control"
                        type="text"
                        placeholder="Quantity"
                        required
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </li>
                  </div>
                </div>

                <li className="cartOffcanvas_body-list_item d-sm-flex align-items-center">
                  <label htmlFor=""></label>
                  <textarea
                    className="form_control"
                    rows={5}
                    placeholder="Describe your product"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </li>
                <div className="col-6 mt-4">
                  <div className="card-body">
                    <div className="mb-3">
                      <input
                        type={"file"}
                        accept="image/gif, image/jpeg, image/png"
                        name="image"
                        id="store-image"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                      <label style={{ display: "flex" }} htmlFor="store-image">
                        {image !== "" ? (
                          <div className="img-place">
                            <img src={URL.createObjectURL(image)} alt="" />
                          </div>
                        ) : (
                          <div className="img-border">
                            <h5>Add Product Image</h5>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                {contract && (
                  <button className="cartOffcanvas_body-btn btn">
                    Add Product
                  </button>
                )}
              </form>
            </>
          ) : (
            <>
              <h4 className="cartOffcanvas_body-list_item d-sm-flex text-align-center align-items-center">
                Please login into your account to continue
              </h4>
              <Link className="cartOffcanvas_body-btn btn" to="/login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddProduct;
