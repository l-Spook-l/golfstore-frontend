import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-black pt-3">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <h5 className="text-white">About Us</h5>
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="col-md-6 col-lg-4">
            <h5 className="text-white">Follow Us</h5>
            <ul className="social-media">
              <li className="text-white">
                <a href="#" target="_blank" rel="noreferrer noopener">
                  <FaFacebookF />
                </a>
              </li>
              <li className="text-white">
                <a href="#" target="_blank" rel="noreferrer noopener">
                  <FaTwitter />
                </a>
              </li>
              <li className="text-white">
                <a href="#" target="_blank" rel="noreferrer noopener">
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-4">
            <h5 className="text-white">Contact Us</h5>
            <address className="text-white">
              1234 Main Street,
              <br />
              Suite 101, Springfield, MA 01234
              <br />
              Phone: (123) 456-7890
              <br />
              Email: info@website.com
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;

/* import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Контакты</h5>
            <ul className="list-unstyled">
              <li>Телефон: +1234567890</li>
              <li>Email: example@example.com</li>
              <li>Адрес: ул. Примерная, д. 1</li>
            </ul>
          </Col>
          <Col md={6}>
            <h5>Ссылки</h5>
            <ul className="list-unstyled">
              <li><a href="/">Главная</a></li>
              <li><a href="/about">О нас</a></li>
              <li><a href="/contact">Контакты</a></li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12} className="text-center">
            <p>&copy; 2023 My Company</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
 */