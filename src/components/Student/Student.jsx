import student from '../../images/jpg/student-picture.jpg';

function Student() {
  return (
    <section className="student">
      <h2 className="student__heading">Студент</h2>
      <div className="student__info-container">
        <div className="sudent__personal-info">
          <h3 className="student__title">Виталий</h3>
          <h4 className="student__subtitle">Фронтенд-разработчик, 30 лет</h4>
          <p className="student__main-text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className="student__social-links">
            <li className="student__social-link-item">
              <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="student__social-link">Facebook</a>
            </li>
            <li className="student__social-link-item">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="student__social-link">Github</a>
            </li>
          </ul>
        </div>
        <img src={student} alt="Фото Студента" className="student__image" />
      </div>
      <h3 className="student__sub-heading">Портфолио</h3>
      <ul className="portfolio">
        <li className="portfolio__list-item">
          <a href="https://www.google.com/" target="_blank" rel="noreferrer" className="portfolio__link">Статичный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a href="https://www.google.com/" target="_blank" rel="noreferrer" className="portfolio__link">Адаптивный сайт</a>
        </li>
        <li className="portfolio__list-item">
          <a href="https://www.google.com/" target="_blank" rel="noreferrer" className="portfolio__link">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  );
}

export default Student;