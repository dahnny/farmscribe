import { Link } from "react-router-dom";
import AddProduct from "./AddProduct";
import { useSelector } from "react-redux";

const Home = (props) => {
  const { contract, address, balance } = useSelector((state) => state.contract);

  return (
    <>
      <main>
        {/* Hero section start */}
        <section className="hero">
          <div className="container d-xl-flex align-items-start">
            <div className="hero_about col-xl-6">
              <div className="hero_header">
                <h1 className="hero_header-title">
                  Highest Quality Food Products
                </h1>
                <p className="hero_header-text">
                  We provide the best food on the network by bringing farmers
                  and their customers together. Begin your sharing journey and
                  share your product TODAY
                </p>
                <a className="hero_header-btn btn" href="shop.html">
                  Our Products
                </a>
              </div>
              <div className="hero_contacts">
                <p className="hero_contacts-text">
                  Our support team is available 24/7 to resolve any product
                  issues
                </p>
                <span className="hero_contacts-data d-flex flex-column flex-sm-row align-items-center">
                  <span className="icon d-flex align-items-center justify-content-center">
                    <i className="icon-call" />
                  </span>
                  <span className="d-flex flex-column">
                    <span>Phone number</span>
                    <a className="link" href="tel:+1234567890">
                      +1-202-555-0133
                    </a>
                  </span>
                </span>
              </div>
            </div>
            <div className="hero_promo col-xl-6">
              <div className="hero_promo-underlay" />
              <div className="hero_promo-underlay--highlight" />
              <div className="hero_slider swiper">
                <div className="swiper-wrapper">
                  {props.products.map((product) => (
                    <div
                      className="
                                  hero_slider-slide
                                  d-flex
                                  flex-column flex-md-row
                                  justify-content-between justify-content-md-start
                                  align-items-md-center
                                  swiper-slide
                              "
                    >
                      <div className="hero_slider-slide_media">
                        <picture>
                          <source
                            data-srcset={`https://ipfs.infura.io/ipfs/${product.imageHash}`}
                            srcSet={`https://ipfs.infura.io/ipfs/${product.imageHash}`}
                            type="image/webp"
                          />
                          <img
                            className="lazy"
                            data-src={`https://ipfs.infura.io/ipfs/${product.imageHash}`}
                            src={`https://ipfs.infura.io/ipfs/${product.imageHash}`}
                            alt="media"
                          />
                        </picture>
                      </div>
                      <div className="hero_slider-slide_main">
                        <h2 className="title">{product.name}</h2>
                        <p className="text">{product.description}</p>
                        <Link className="btn--underline" to={`/product/${product.imageHash}`}>
                          About Product
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="hero-pagination swiper-pagination d-sm-flex flex-column" /> */}
              </div>
            </div>
          </div>
        </section>
        {/* Hero section end */}
        {/* Featured products section start */}
        <section className="featured section--nopb">
          <div className="container">
            <div className="featured_header">
              <h2 className="featured_header-title">Featured Products</h2>
              {!contract && (
                <p className="featured_header-text">
                  Please connect Metamask wallet
                </p>
              )}
            </div>
            <div className="products_list d-grid">
              {props.products.map((product) => (
                <div className="products_list-item">
                  <div className="products_list-item_wrapper d-flex flex-column">
                    <div className="media">
                      <a href="" target="_blank" rel="noopener norefferer">
                        <picture>
                          <source
                            data-srcset={`https://ipfs.infura.io/ipfs/${product.imageHash}`}
                            srcSet={`https://ipfs.infura.io/ipfs/${product.imageHash}`}
                            type="image/webp"
                          />
                          <img
                            className="lazy preview"
                            data-src={`https://ipfs.infura.io/ipfs/${product.imageHash}`}
                            src={`https://ipfs.infura.io/ipfs/${product.imageHash}`}
                            alt=""
                          />
                        </picture>
                      </a>
                      <div className="overlay d-flex justify-content-between align-items-start">
                        <div className="action d-flex flex-column">
                          <Link
                            className="action_link d-flex align-items-center justify-content-center"
                            data-trigger="compare"
                          >
                            <i className="icon-basket" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="main d-flex flex-column align-items-center justify-content-between">
                      <a
                        className="main_title"
                        href="product.html"
                        target="_blank"
                        rel="noopener norefferer"
                      >
                        {product.name}
                      </a>
                      <ul className="main_table d-flex flex-column align-items-center">
                        <li className="list-item">
                          <span className="value">{product.description}</span>
                        </li>
                        <li className="list-item">
                          <span className="property">
                            In stock: {product.quantity}
                          </span>
                        </li>
                      </ul>
                      <div className="main_price">
                        <span className="price">{product.price}DEV</span>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <Link
                            className="btn btn--green"
                            onClick={() => props.buyProduct(product.index, 1)}
                            // onClick={props.buyProduct}
                          >
                            Buy
                          </Link>
                        </div>
                        <div className="col-6">
                          <a className="btn btn--green" href="#">
                            <i className="icon-mail" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {contract ? <Link className="featured_btn btn" to={"/products"}>
              All Products
            </Link>: <Link className="featured_btn btn" onClick={props.connect}>
                Connect
            </Link>}
          </div>
        </section>

        <section className="info section">
          <div className="info_deco">
            <div className="info_deco-wrapper">
              <picture>
                <source
                  data-srcset="img/placeholder.jpg"
                  srcSet="img/placeholder.jpg"
                  type="image/webp"
                />
                <img
                  className="lazy leaf leaf--left"
                  data-src="img/placeholder.jpg"
                  src="img/placeholder.jpg"
                  alt="deco"
                />
              </picture>
            </div>
            <div className="info_deco-wrapper">
              <picture>
                <source
                  data-srcset="img/placeholder.jpg"
                  srcSet="img/placeholder.jpg"
                  type="image/webp"
                />
                <img
                  className="lazy leaf leaf--right"
                  data-src="img/placeholder.jpg"
                  src="img/placeholder.jpg"
                  alt="deco"
                />
              </picture>
            </div>
          </div>
          <div className="info_highlight">
            <span className="underlay underlay--left">
              <span className="underlay_circle underlay_circle--accent" />
            </span>
            <span className="underlay underlay--right">
              <span className="underlay_circle underlay_circle--small underlay_circle--green" />
              <span className="underlay_circle underlay_circle--big underlay_circle--green" />
            </span>
          </div>
          <div className="container">
            <div className="info_content d-flex flex-column align-items-center">
              <span className="info_content-logo">
                <img src="img/logo.png" style={{ width: "50px" }} alt="" />
              </span>
              <h2 className="info_content-header">
                Our sole purpose is to enable farmers sell their products but
                also have a connection with their customers and other farmers
                using the moonbeam network
              </h2>
            </div>
          </div>
        </section>
        {/* Promo info section end  */}
        {/* Effects section start  */}
        <section className="effects section--nopb">
          <span className="effects_underlay">
            <span className="effects_underlay-circle effects_underlay-circle--accent" />
            <span className="effects_underlay-circle effects_underlay-circle--green" />
          </span>
          <div className="container d-md-flex flex-wrap flex-xxl-nowrap justify-content-between align-items-center">
            <div className="effects_header d-lg-flex flex-xxl-column col-md-12 col-xxl-auto">
              <div className="main col-lg-6 col-xl-12">
                <h2 className="effects_header-title">
                  Join the family. Become a Farmscriber today
                </h2>
                <p className="effects_header-text">
                  We are a community but best of all we are also a family. Help
                  us change the world by making our family bigger
                </p>
                <a className="effects_header-btn btn" href="shop.html">
                  Join
                </a>
              </div>
            </div>
            <div className="effects_media">
              <picture>
                <source
                  data-srcset="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
                  srcSet="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
                  type="image/webp"
                />
                <img
                  className="lazy"
                  data-src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
                  src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
                  alt="media"
                />
              </picture>
            </div>
            <ul className="effects_list col-xxl-4">
              <li
                className="effects_list-item d-flex flex-column align-items-center flex-sm-row align-items-sm-start"
                data-aos="fade-up"
              >
                <span className="icon d-flex align-items-center justify-content-center">
                  <i className="icon-flash" />
                </span>
                <div className="wrapper">
                  <h4 className="effects_list-item_header">
                    Relief of chronic pain
                  </h4>
                  <p className="effects_list-item_text">
                    Feugiat in fermentum posuere urna nec tincidunt praesent
                    semper feugiat pulvinar proin
                  </p>
                </div>
              </li>
              <li
                className="effects_list-item d-flex flex-column align-items-center flex-sm-row align-items-sm-start"
                data-aos="fade-up"
              >
                <span className="icon d-flex align-items-center justify-content-center">
                  <i className="icon-heartbeat" />
                </span>
                <div className="wrapper">
                  <h4 className="effects_list-item_header">Fight cancer</h4>
                  <p className="effects_list-item_text">
                    Feugiat in fermentum posuere urna nec tincidunt praesent
                    semper feugiat pulvinar proin
                  </p>
                </div>
              </li>
              <li
                className="effects_list-item d-flex flex-column align-items-center flex-sm-row align-items-sm-start"
                data-aos="fade-up"
              >
                <span className="icon d-flex align-items-center justify-content-center">
                  <i className="icon-head" />
                </span>
                <div className="wrapper">
                  <h4 className="effects_list-item_header">Depression</h4>
                  <p className="effects_list-item_text">
                    Feugiat in fermentum posuere urna nec tincidunt praesent
                    semper feugiat pulvinar proin
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <AddProduct createProduct = {props.createProduct}/>
    </>
  );
};

export default Home;
