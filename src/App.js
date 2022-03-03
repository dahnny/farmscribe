import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch as match,
} from "react-router-dom";

import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";

import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector, useDispatch, connectAdvanced } from "react-redux";
import { uiActions } from "./slices/ui-slice";
import { getAuthenticationStatus } from "./actions/user";
import Web3 from "web3";
import BigNumber from "bignumber.js";

import farmscribe from "./contracts/farmscribe.abi.json";
import { ethers } from "ethers";
import { contractActions } from "./slices/contract-slice";
import Products from "./components/Products";
import ProductItem from "./components/ProductItem";

function App() {
  const override = css`
    overflow-y: hidden;
    display: block;
    position: relative;
    margin: 0 auto;
    border-color: red;
    margin-top: 20%;
  `;

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.ui.isLoading);
  let notification = useSelector((state) => state.ui.notification);
  if (notification) {
    toast(notification, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    dispatch(uiActions.setNotification(null));
  }

  const contractAddress = "0x58A64De0839E4BdC9c3F1E0012FCA93Aef304F57";

  const { contract, address, balance } = useSelector((state) => state.contract);

  const [products, setProducts] = useState([]);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);

      try {
        window.ethereum.enable();
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log(accounts);
        // const accounts = await new web3.eth.getAccounts();
        const address = accounts[0];
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();

        const _balance = await new web3.eth.getBalance(address);
        const balance = (_balance / 10 ** 18).toFixed(2);
        console.log(balance);
        const contract = await new web3.eth.Contract(
          farmscribe,
          contractAddress
        );
        // const contract = new ethers.Contract(contractAddress, farmscribe, signer)
        dispatch(
          contractActions.setContract({ contract, address, balance: balance })
        );
      } catch (error) {
        dispatch(uiActions.setNotification(error.message));
      }
    }
  };

  const getProducts = async () => {
    try {
      const productLength = await contract.methods.getProductLength().call();
      // const productLength = await contract.getProductLength()
      const _products = [];

      for (let index = 0; index < productLength; index++) {
        let _product = new Promise(async (resolve, reject) => {
          let product = await contract.methods.getProduct(index).call();
          // let product = await contract.getProduct(index);
          resolve({
            index: index,
            owner: product[0],
            name: product[1],
            description: product[2],
            imageHash: product[3],
            quantity: product[4],
            price: product[5],
          });
        });
        _products.push(_product);
      }
      const products = await Promise.all(_products);
      console.log(products);
      setProducts(products);
    } catch (error) {
      dispatch(uiActions.setNotification(error.message));
    }
  };

  const buyProduct = async (index, quantity) => {
    try {
      const web3 = new Web3(window.ethereum);
      console.log(web3.utils.toWei(String(products[index].price)));
      dispatch(uiActions.toggle());
      await contract.methods.confirmBuy(index, quantity).send({
        from: address,
        value: web3.utils.toWei(
          String(products[index].price * quantity),
          "Ether"
        ),
      });
      dispatch(uiActions.toggle());
    } catch (error) {
      dispatch(uiActions.setNotification(error.message));
      dispatch(uiActions.toggle());
    }
  };

  const createProduct = async (name, description, image, quantity, price) => {
    try {
      dispatch(uiActions.toggle());
      await contract.methods
        .addProduct(name, description, image, quantity, price)
        .send({ from: address });
      getProducts();
      dispatch(uiActions.toggle());
    } catch (error) {
      dispatch(uiActions.setNotification(error.message));
      dispatch(uiActions.toggle());
    }
  };

  useEffect(() => {
    dispatch(getAuthenticationStatus());
  }, [dispatch]);

  useEffect(() => {
    if (contract) {
      getProducts();
    }
  }, [contract]);

  return (
    <>
      <ToastContainer />
      {!isLoading && (
        <Router>
          <Switch>
            <Route path={"/login"}>
              <Login />
            </Route>
            <Route path={"/register"}>
              <Register />
            </Route>
            <Route exact path={"/"}>
              <Header balance={balance} connect={connectWallet} />
              <Home
                products={products}
                buyProduct={buyProduct}
                createProduct={createProduct}
                connect={connectWallet}
              />
              <Footer />
            </Route>
            <Route path={"/products"}>
              <Header balance={balance} connect={connectWallet} />
              <Products
                products={products}
                buyProduct={buyProduct}
                createProduct={createProduct}
              />
            </Route>
            <Route path={"/product/:id"}>
              <Header balance={balance} connect={connectWallet} />
              <ProductItem products={products} buyProduct={buyProduct} />
              <Footer />
            </Route>
          </Switch>
        </Router>
      )}

      <div className="loader">
        <MoonLoader loading={isLoading} css={override} color="#DC4731" />
      </div>
    </>
  );
}

export default App;
