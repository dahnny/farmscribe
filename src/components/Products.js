import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../components/css/shop.css'
import { uiActions } from '../slices/ui-slice';
import AddProduct from './AddProduct';

const Products = (props) => {
    const { contract, address, balance } = useSelector((state) => state.contract);
    const dispatch = useDispatch();
    const checkBuy  = async(index, quantity)=>{
        if(quantity > 0){
            props.buyProduct(index, 1)
        }else{
            dispatch(uiActions.setNotification("Item has sold out"))
        }
    }

  return (
    <>
      <main>
        {/* Products section start */}
        <div className="section--nopb">
          <div className="container d-flex flex-wrap flex-column justify-content-between">
            {/* <a
              className="filterTrigger d-flex d-lg-none align-items-center justify-content-center"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#shopFilters"
            >
              Filters
              <i className="icon-caret_down icon" />
            </a> */}
            {contract ?<div className="shop_products d-flex flex-column">
              <ul className="shop_products-list d-flex flex-wrap">
                {props.products.map(product=><li
                  className="shop_products-list_item col-sm-6 col-md-4 col-lg-6 col-xl-4"
                  data-order={product.index}
                >
                  <div className="wrapper d-flex flex-column">
                    <div className="media">
                      <div className="overlay d-flex flex-column align-items-center justify-content-center">
                        <ul className="action d-flex align-items-center justify-content-center">
                          <li className="list-item">
                            <Link
                              className="action_link d-flex align-items-center justify-content-center"
                              onClick={()=>checkBuy(product.index, product.quantity)}
                              
                            >
                              <i className="icon-basket" />
                            </Link>
                          </li>
                          <li className="list-item">
                            <a
                              className="action_link d-flex align-items-center justify-content-center"
                              href="#"
                              data-trigger="view"
                            >
                              <i className="icon-mail" />
                            </a>
                          </li>
                        </ul>
                      </div>
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
                    <div className="main d-flex flex-column">
                    <h3>Quantity: {product.quantity}</h3>
                      <a
                        className="main_title"
                        href="product.html"
                        target="_blank"
                        rel="noopener norefferer"
                      >
                        {product.title}
                      </a>
                      <div className="main_rating" style={{"paddingBottom":"15px"}}>
                        <p style={{"lineHeight":"1.5"}}>{product.description}</p>
                      </div>
                      <div className="main_price">
                        <span className="price">{product.price}DEV</span>
                      </div>
                      <div className="main_rating" style={{"paddingBottom":"15px"}}>
                        <small className='comments'>11 comments</small>
                      </div>
                    </div>
                  </div>
                </li>)}
              </ul>
              {/* <ul className="pagination d-flex align-items-center">
                <li className="pagination-page">
                  <a
                    className="pagination-page_link d-flex align-items-center justify-content-center"
                    href="#"
                    data-current="true"
                  >
                    1
                  </a>
                </li>
                <li className="pagination-page">
                  <a
                    className="pagination-page_link d-flex align-items-center justify-content-center"
                    href="#"
                  >
                    2
                  </a>
                </li>
                <li className="pagination-page">
                  <a
                    className="pagination-page_link d-flex align-items-center justify-content-center"
                    href="#"
                  >
                    3
                  </a>
                </li>
              </ul> */}
            </div>: <h3>Please Connect your metamask wallet :(</h3>
            }
            
          </div>
        </div>
      </main>
      <AddProduct/>
    </>
  );
};

export default Products;
