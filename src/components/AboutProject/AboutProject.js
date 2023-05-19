import './AboutProject.css'

function AboutProject() {
    return (
        <section className="aboutProject">
        <h1 className="aboutProject__title" id="about_project">О проекте</h1>
        <div className="aboutProject__container">
          <div className="aboutProject__content">
            <h2 className="aboutProject__content-title">Дипломный проект включал 5 этапов</h2>
            <h2 className="aboutProject__content-title">На выполнение диплома ушло 5 недель</h2>
            <p className="aboutProject__content-text">Составление плана, работу над бэкендом, верстку, добавление функциональности и финальные доработки.</p>
            <p className="aboutProject__content-text">У каждого этапа был мягкий и жесткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
          <div className="aboutProject__scheme">
            <p className="aboutProject__scheme-text aboutProject__scheme-text_green">1 неделя</p>
            <p className="aboutProject__scheme-text aboutProject__scheme-text_grey">4 недели</p>
            <p className="aboutProject__scheme-text">Back-end</p>
            <p className="aboutProject__scheme-text">Front-end</p>
          </div>
        </div>
      </section>
    )
}
export default AboutProject;