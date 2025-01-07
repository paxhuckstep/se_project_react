import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">Developed by Pax Hucktep</p>
        <p className="footer__text">{year}</p>
      </div>
    </footer>
  );
}

export default Footer;
