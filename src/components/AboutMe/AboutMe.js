import './AboutMe.css';
import aboutMeFoto from '../../images/pic_photo.svg';
import Portfolio from '../Portfolio/Portfolio';
import { portfolioList } from '../../utils/userData';

function AboutMe() {
    return (
        <section className="aboutMe">
            <h2 className="aboutMe__title" id="about_student">Студент</h2>
            <div className="aboutMe__profile">
                <image className="aboutMe__photo"/>
                    <div className="aboutMe__info-container">
                        <div className="aboutMe__info">
                            <h2 className="aboutMe__info_name">Екатерина</h2>
                            <h3 className="aboutMe__info_line">Фронтенд-разработчик</h3>
                            <p className="aboutMe__info_description">Я живу в Москве, закончила геологический факультет ПГУ.
                                У меня есть муж и сын. Я лублю слушать музыку, смотреть фильмы и читать интересные книги. После того, как
                                пройду курс по веб-разработке, займусь фриланс-заказами или найду постоянную работу. </p>
                        </div>
                        <nav className="aboutMe__infoLinks">
                            <a className="aboutMe__infoLink" href="">Facebook</a>
                            <a className="aboutMe__infoLink" href="https://github.com/eamironenko">Github</a>
                        </nav>
                    </div>
            </div>
            <div className="portfolio">
                <h3 className="portfolio__title">Портфолио</h3>
                <ul className='portfolio__list'>
                    {portfolioList.map((item) => (
                        <Portfolio key={item.id} title={item.title} url={item.url}/>
                    ))}
                </ul>            
            </div>
        </section>
    )
}
export default AboutMe;