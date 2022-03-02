import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { contract, address, balance } = useSelector((state) => state.contract);

  return (
    <header
      className="header d-flex flex-wrap align-items-center"
      data-page="home"
      data-overlay="true"
    >
      <div className="container d-flex flex-wrap flex-xl-nowrap align-items-center justify-content-between">
        <Link className="brand header_logo d-flex align-items-center" to="/">
          <span className="logo">
            <img src="img/logo.png" style={{ width: "50px" }} alt="" />
          </span>
          <span className="accent">Farm</span>
          <span>Scribe</span>
        </Link>

        <span className="header_trigger d-inline-flex d-xl-none flex-column justify-content-between">
          <span className="line line--short" />
          <span className="line line" />
          <span className="line line--short" />
          <span className="line line" />
        </span>
        <div className="header_user d-flex justify-content-end align-items-center">
          <form
            className="header_user-search"
            action="#"
            method="get"
            data-type="searchForm"
          >
            <input
              className="header_user-search_field field required"
              type="text"
              placeholder="Search..."
            />
            <button
              className="header_user-search_btn header_user-action d-inline-flex align-items-center justify-content-center"
              type="submit"
              data-trigger="search"
            >
              <i className="icon-search" />
            </button>
          </form>

          {!contract && !address ? (
            <Link
              className="header_user-action wallet d-inline-flex align-items-center justify-content-center"
              onClick={props.connect}
              style={{
                width: "150px",
                fontWeight: "600",
                borderRadius: "20px",
              }}
            >
              <p>Connect Wallet</p>
            </Link>
          ) : (
            <Link
              className="header_user-action wallet d-inline-flex align-items-center justify-content-center"
              disabled
              style={{
                width: "150px",
                fontWeight: "600",
                borderRadius: "20px",
              }}
            >
              <p>Connected...</p>
            </Link>
          )}
          <a
            className="header_user-action d-inline-flex align-items-center justify-content-center"
            data-bs-toggle="offcanvas"
            data-bs-target="#cartOffcanvas"
            aria-controls="cartOffcanvas"
          >
            <i className="icon-plus" />
          </a>
        </div>
        <nav className="header_nav">
          <ul className="header_nav-list">
            {/* <li className="header_nav-list_item dropdown">
              <a
                className="nav-link dropdown-toggle d-inline-flex align-items-center"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#homeMenu"
                aria-expanded="false"
                aria-controls="homeMenu"
              >
                Home
                <i className="icon-caret_down icon" />
              </a>
              <div className="dropdown-menu collapse" id="homeMenu">
                <ul className="dropdown-list">
                  <li className="list-item nav-item" data-page="home">
                    <a className="dropdown-item" href="index.html">
                      Home 01
                    </a>
                  </li>
                  <li className="list-item nav-item" data-page="home2">
                    <a className="dropdown-item" href="index2.html">
                      Home 02
                    </a>
                  </li>
                </ul>
              </div>
            </li> */}
            <li className="header_nav-list_item dropdown">
              <Link
                style={{
                  width: "150px",
                  fontWeight: "600",
                  borderRadius: "20px",
                }}
                className="header_user-action wallet d-inline-flex align-items-center justify-content-center"
              >
                <p>{!balance ? "XXXX" : balance} DEV</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
