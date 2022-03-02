const Footer = (props) => {
  return (
    <>
      <footer className="footer">
        <div className="footer_main section">
          <div className="container d-flex flex-column flex-md-row flex-wrap flex-xl-nowrap justify-content-xl-between">
            <div className="footer_main-about footer_main-block col-md-6 col-xl-auto">
              <a
                className="brand footer_main-about_brand d-flex align-items-center"
                href="index.html"
              >
                <span className="logo">
                <img src="img/logo.png" style={{"width":"50px"}} alt="" />

                </span>
                <span className="accent">Farm</span>
                <span>scribe</span>
              </a>
              <div className="footer_main-about_wrapper">
                <p className="text">
                  Elementum nisi quis eleifend quam adipiscing. Cursus metus
                  aliquam eleifend mi in nulla posuere sollicitudin
                </p>
                <ul className="socials d-flex align-items-center accent">
                  <li className="list-item">
                    <a
                      className="link"
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener norefferer"
                    >
                      <i className="icon-facebook icon" />
                    </a>
                  </li>
                  <li className="list-item">
                    <a
                      className="link"
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener norefferer"
                    >
                      <i className="icon-instagram icon" />
                    </a>
                  </li>
                  <li className="list-item">
                    <a
                      className="link"
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener norefferer"
                    >
                      <i className="icon-twitter icon" />
                    </a>
                  </li>
                  <li className="list-item">
                    <a
                      className="link"
                      href="https://whatsapp.com"
                      target="_blank"
                      rel="noopener norefferer"
                    >
                      <i className="icon-whatsapp icon" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer_main-contacts footer_main-block col-md-6 col-xl-auto">
              <h4 className="footer_main-contacts_header footer_main-header">
                Contacts information
              </h4>
              <ul className="footer_main-contacts_list">
                <li className="list-item d-flex align-items-center">
                  <span className="icon d-flex justify-content-center align-items-center">
                    <i className="icon-call" />
                  </span>
                  <div className="wrapper d-flex flex-column">
                    <a className="link" href="tel:+1234567890">
                      +1-202-555-0133
                    </a>
                    <a className="link" href="tel:+1234567890">
                      +1-202-555-0133
                    </a>
                  </div>
                </li>
                <li className="list-item d-flex align-items-center">
                  <span className="icon d-flex justify-content-center align-items-center">
                    <i className="icon-location" />
                  </span>
                  <div className="wrapper d-flex flex-column">
                    <span>192 North Border Street</span>
                    <span>Lithonia, GA 30038</span>
                  </div>
                </li>
                <li className="list-item d-flex align-items-center">
                  <span className="icon d-flex justify-content-center align-items-center">
                    <i className="icon-clock" />
                  </span>
                  <div className="wrapper d-flex flex-column">
                    <span>9:00 am to 5:00 pm</span>
                    <span>Monday to Saturday</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
        <div className="footer_secondary">
          <div
            className="
                  container
                  d-flex
                  flex-column-reverse flex-md-row
                  justify-content-center justify-content-md-between
                  align-items-md-center
              "
          >
            <p className="footer_secondary-copyright">
              Powered By:
              <span className="linebreak">
                Moonbeam Blockchain Technology
              </span>
            </p>
            <ul className="footer_secondary-list d-flex justify-content-center align-items-center">
              <li className="list-item">
                <span className="vector">
                  <img style={{"width":"50px"}} src="img/moonbeam.png" alt="" />
                </span>
              </li>

            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
