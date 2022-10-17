import './Techs.css'
function Techs() {
    return (
        <section className="techs">
        <h2 className="techs__title" id="about_technology">Технологии</h2>
        <article className="techs__container">
          <h2 className="techs__title">7 технологий</h2>
          <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <div className="techs__themes">
            <p className="techs_theme">HTML</p>
            <p className="techs_theme">CSS</p>
            <p className="techs_theme">JS</p>
            <p className="techs_theme">React</p>
            <p className="techs_theme">Git</p>
            <p className="techs_theme">Express.js</p>
            <p className="techs_theme">MongoDB</p>
          </div>
        </article>
      </section>
    )
}
export default Techs;