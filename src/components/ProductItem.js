import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../components/css/product2.css";
import { addCommentApi, getProductApi } from "../actions/product";
import { toast } from "react-toastify";
import { uiActions } from "../slices/ui-slice";
import { productActions } from "../slices/product-slice";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.product.product.comments);
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getProductApi(id));
    const product = props.products.filter(
      (product) => product.imageHash === id
    );
    console.log(product);
    setProduct(product[0]);
  }, [id, props.products, dispatch]);

  const increaseQuantity = () => {
    setQuantity((prev) => {
      return prev + 1;
    });
  };

  const decreaseQuantity = () => {
    if (quantity === 0) return;
    setQuantity((prev) => {
      return prev - 1;
    });
  };

  const buyProduct = (index) => {
    if (quantity <= 0) return;
    props.buyProduct(index, quantity);
  };

  const handleComment = (event) => {
    event.preventDefault();
    if (!user) {
      dispatch(uiActions.setNotification("Please login to your account"));
    } else {
      dispatch(addCommentApi(id, { email: user.email, comment }));
    }
  };

  return (
    <>
      <main>
        <section className="about section--nopb">
          <div className="container">
            {/* Product main */}
            <div className="about_main d-md-flex flex-nowrap justify-content-between align-items-start">
              <div className="about_main-slider about_main-slider--destroy">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <a href="img/placeholder.jpg" data-role="gallery">
                      <picture>
                        <source
                          data-srcset={`https://ipfs.infura.io/ipfs/${product.imageHash}`}
                          srcSet={`https://ipfs.infura.io/ipfs/${product.imageHash}`}
                          type="image/webp"
                        />
                        <img
                          className="lazy"
                          data-src={`https://ipfs.infura.io/ipfs/${product.imageHash}`}
                          src="img/placeholder.jpg"
                          alt="media"
                        />
                      </picture>
                    </a>
                  </div>
                </div>
                <div className="swiper-controls d-flex d-md-none align-items-center justify-content-between">
                  <a
                    className="swiper-button-prev d-inline-flex align-items-center justify-content-center"
                    href="#"
                  >
                    <i className="icon-caret_left icon" />
                  </a>
                  <a
                    className="swiper-button-next d-inline-flex align-items-center justify-content-center"
                    href="#"
                  >
                    <i className="icon-caret_right icon" />
                  </a>
                </div>
              </div>
              <div className="about_wrapper" data-sticky="true">
                <div className="about_main-info">
                  <div
                    className="
                                  about_main-info_product
                                  d-sm-flex
                                  flex-md-column flex-xl-row
                                  align-items-center align-items-md-start align-items-xl-center
                                  justify-content-between
                              "
                  >
                    <h2 className="title">{product.name}</h2>
                    <div className="action d-flex">
                      <a
                        className="action_link d-flex align-items-center justify-content-center"
                        href="#"
                        data-role="wishlist"
                      >
                        <i className="icon-heart" />
                      </a>
                      <a
                        className="action_link d-flex align-items-center justify-content-center"
                        href="#"
                        data-trigger="compare"
                      >
                        <i className="icon-compare" />
                      </a>
                    </div>
                  </div>

                  <p className="about_main-info_description">
                    {product.description}
                  </p>
                  <div
                    className="
                                  about_main-info_block
                                  d-flex
                                  flex-column flex-sm-row flex-md-column flex-xl-row
                                  align-items-sm-center align-items-md-start align-items-xl-center
                              "
                  >
                    <h5 className="title">In Stock :</h5>
                    <ul className="weight-list list d-flex flex-wrap">
                      <li className="list-item">
                        <input type="radio" id="weight1" name="weight" />
                        <label htmlFor="weight1">{product.quantity}</label>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="
                                  about_main-info_block
                                  d-flex
                                  flex-column flex-sm-row flex-md-column flex-xl-row
                                  align-items-sm-center align-items-md-start align-items-xl-center
                              "
                  >
                    <h5 className="title">Quantity</h5>
                    <div className="qty d-flex align-items-center justify-content-between">
                      <span className="qty_minus control d-flex align-items-center">
                        <i className="icon-minus" onClick={decreaseQuantity} />
                      </span>
                      <input
                        className="qty_amount"
                        type="number"
                        readOnly
                        value={quantity}
                        min={1}
                        max={99}
                      />
                      <span className="qty_plus control d-flex align-items-center">
                        <i className="icon-plus" onClick={increaseQuantity} />
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="about_main-info_price">
                      {product.price}DEV
                    </span>
                    <Link
                      onClick={() => buyProduct(product.index)}
                      className="btn"
                    >
                      Buy
                    </Link>
                  </div>
                </div>
                <div className="about_secondary">
                  <div className="about_secondary-content">
                    <div
                      className="about_secondary-content_tabs tab-content"
                      id="productTabs"
                      data-scroll="true"
                    >
                      <div className="wrapper mt-5 pt-5">
                        <h4
                          className="accordion_component-item_header d-flex justify-content-between align-items-center"
                          data-bs-toggle="collapse"
                          data-bs-target="#reviews"
                          id="reviews-tab"
                        >
                          <span className="wrapper">
                            {" "}
                            Comments (
                            <span id="reviewsCountResponsive">
                              {comments && comments.length}
                            </span>
                            ){" "}
                          </span>
                          <i className="icon-caret_down icon" />
                        </h4>
                        <div
                          className="tab-pane collapse"
                          id="reviews"
                          role="tabpanel"
                          aria-labelledby="reviews-tab"
                          data-bs-parent="#productTabs"
                        >
                          <div className="reviews-section">
                            <ul className="reviews-section_list">
                              {comments &&
                                comments.map((comment) => (
                                  <li className="review">
                                    <div className="review_header d-sm-flex flex-wrap">
                                      <span className="name">{comment.email}</span>

                                      {/* <span className="timestamp">
                                    September 30, 2021 at 9:52 am
                                  </span> */}
                                    </div>
                                    <p className="review_main">
                                     {comment.comment}
                                    </p>
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="form-section">
                            <form
                              className="
                                                      form-section_form
                                                      form
                                                      d-flex
                                                      flex-column flex-lg-row flex-wrap
                                                      justify-content-between
                                                  "
                              id="reviewForm"
                              onSubmit={handleComment}
                            >
                              <div className="field-wrapper fluid">
                                <label
                                  className="label"
                                  htmlFor="reviewContent"
                                >
                                  Comment
                                </label>
                                <textarea
                                  className="field field--message required"
                                  id="reviewContent"
                                  placeholder="How do you feel about this  product"
                                  defaultValue={""}
                                  onChange={(e) => setComment(e.target.value)}
                                />
                              </div>
                              <div
                                className="
                                                          form-section_footer
                                                          d-flex
                                                          flex-column flex-sm-row flex-wrap
                                                          justify-content-between
                                                      "
                              >
                                <div className="btn-wrapper">
                                  <button className="btn" type="submit">
                                    Leave a Comment
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductItem;
