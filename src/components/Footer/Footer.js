import React from 'react';
import { Route, Switch} from 'react-router-dom';
import './Footer.css'
function Footer() {
    return (
        <Switch>
            <Route exact path={["/", "/movies", "/saved-movies"]}>
                <footer className="footer">
                    <p className="footer__content">Учебный проект Яндекс.Практикум x BeatFilm</p>
                    <div className="footer__info">
                        <p className="footer__copyright">&copy; 2022</p>
                        <nav className="footer__links">
                            <a className="footer__link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
                            <a className="footer__link" href="https://github.com/eamironenko">Github</a>
                        </nav>
                    </div>
                </footer>
            </Route>
        </Switch>
    )
}

export default Footer;