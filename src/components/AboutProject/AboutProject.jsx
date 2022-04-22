function AboutPoject() {
    return (
      <section className="about">
        <h2 className="about__heading">О проекте</h2>
        <div className="about__text-container">
          <div className="about__text-box">
            <h3 className="about__sub-heading">Дипломный проект включал 5 этапов</h3>
            <p className="about__paragraph">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className="about__text-box">
            <h3 className="about__sub-heading">На выполнение диплома ушло 5 недель</h3>
            <p className="about__paragraph">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about__progress">
          <div className="about__progress-box">
            <p className="about__progress-bar about__progress-bar_position_left">1 неделя</p>
            <p className="about__sub-text">Back-end</p>
          </div>
          <div className="about__progress-box">
            <p className="about__progress-bar">4 недели</p>
            <p className="about__sub-text">Front-end</p>
          </div>
        </div>
      </section>
    );
  }
  
  export default AboutPoject;