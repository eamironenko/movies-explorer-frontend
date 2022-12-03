import React from "react";
import './Portfolio.css';
import portfolio__logo from '../../images/nav.svg';

function Portfolio({ title, url }) {
  return (
    <li className="portfolio__links">
            <a className="portfolio__links_content"
                href={url}
                target='_blank'
                rel="noreferrer">
                {title}
                <img className="portfolio__links_nav"
                    alt='Иконка ссылки'
                    src={portfolio__logo} />
            </a>
        </li>
    
  );
}

export default Portfolio;