function Footer() {
    return (
      <section className="footer">
        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__container">
          <p className="footer__credit">&copy; 2020</p>
          <ul className="footer__list">
            <li className="footer__list-item">
              <a href="https://www.google.com/" target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a>
            </li>
            <li className="footer__list-item">
              <a href="https://www.github.com/" target="_blank" rel="noreferrer" className="footer__link">Github</a>
            </li>
            <li className="footer__list-item">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="footer__link">Facebook</a>
            </li>
          </ul>
        </div>
      </section>
    );
  }
  
  export default Footer;