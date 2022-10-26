import './Portfolio.css';
import portfolio__logo from '../../images/nav.svg';
function Portfolio() {
    return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <div className="portfolio__links">
        <p className="portfolio__links_content">Страничный сайт</p>
        <a className="portfolio__links_nav" href="https://github.com/eamironenko/react-mesto-api-full.git"></a>
      </div>
      <div className="portfolio__links">
        <p className="portfolio__links_content">Адаптивный сайт</p>
        <a className="portfolio__links_nav" href="https://github.com/eamironenko/russian-travel.git"></a>
      </div>
      <div className="portfolio__links">
        <p className="portfolio__links_content">Одностраничное приложение</p>
        <a className="portfolio__links_nav" href="https://github.com/eamironenko/how-to-learn.git"></a>
      </div>
    </div>
    );
}

export default Portfolio;