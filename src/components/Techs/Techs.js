import './Techs.css'
function Techs() {
    return (
        <section className="techs">
        <h2 className="techs__title" id="about_technology">Технологии</h2>
        <article className="techs__container">
          <h2 className="techs__content">7 технологий</h2>
          <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <ul className="techs__themes">
            <li className="techs_theme">HTML</li>
            <li className="techs_theme">CSS</li>
            <li className="techs_theme">JS</li>
            <li className="techs_theme">React</li>
            <li className="techs_theme">Git</li>
            <li className="techs_theme">Express.js</li>
            <li className="techs_theme">MongoDB</li>
          </ul>
        </article>
      </section>
    )
}
export default Techs;