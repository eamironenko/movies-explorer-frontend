import './Portfolio.css';
import portfolio__logo from '../../images/nav.svg';

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <div className="portfolio__links">
        <a className="portfolio__links_content" href="https://github.com/eamironenko/react-mesto-api-full.git"
        target='_blank' rel="noreferrer">
          Страничный сайт
          <img className="portfolio__links_nav" alt='иконка ссылки' src={portfolio__logo} />
        </a>
      </div>
      <div className="portfolio__links" >
        <a className="portfolio__links_content" href="https://github.com/eamironenko/russian-travel.git"
        target='_blank' rel="noreferrer">
          Адаптивный сайт
          <img className="portfolio__links_nav" alt='иконка ссылки' src={portfolio__logo} />
        </a>
      </div>
      <div className="portfolio__links">
        <a className="portfolio__links_content" href="https://github.com/eamironenko/how-to-learn.git"
        target='_blank' rel="noreferrer">
          Одностраничное приложение
          <img className="portfolio__links_nav" alt='иконка ссылки' src={portfolio__logo} />
        </a>
      </div>
    </div>
  );
}

export default Portfolio;