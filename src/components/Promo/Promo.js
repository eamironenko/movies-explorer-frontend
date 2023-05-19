import './Promo.css';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <div className="navTab">
          <a className="navTab__link" href="#about_project">О проекте</a>
          <a className="navTab__link" href="#about_technology">О Технологии</a>
          <a className="navTab__link" href="#about_student">Студент</a>
        </div>
      </div>
    </section>
  )
}

export default Promo;