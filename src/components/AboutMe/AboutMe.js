import './AboutMe.css';
import aboutMeFoto from '../../images/pic_photo.svg';
import Portfolio from '../Portfolio/Portfolio';
function AboutMe() {
    return (
        <section className="aboutMe">
            <h2 className="aboutMe__title" id="about_student">Студент</h2>
            <div className="aboutMe__profile">
                <image className="aboutMe__photo"/>
                    <div className="aboutMe__info-container">
                        <div className="aboutMe__info">
                            <h2 className="aboutMe__info_type_name">Екатерина</h2>
                            <h3 className="aboutMe__info_type_line">Фронтенд-разработчик</h3>
                            <p className="aboutMe__info_type_description">Я живу в Москве, закончила геологический факультет ПГУ.
                                У меня есть муж и сын. Я лублю слушать музыку, смотреть фильмы и читать интересные книги. После того, как
                                пройду курс по веб-разработке, займусь фриланс-заказами или найду постоянную работу. </p>
                        </div>
                        <nav className="aboutMe__info_type_links">
                            <a className="aboutMe__info_type_link" href="">Facebook</a>
                            <a className="aboutMe__info_type_link" href="https://github.com/eamironenko">Github</a>
                        </nav>
                    </div>
            </div>
            <Portfolio />
        </section>
    )
}
export default AboutMe;