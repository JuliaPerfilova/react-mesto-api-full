import headerLogo from '../images/logo.svg';
import { Link, Switch, Route } from 'react-router-dom'

function Header({email, isLoggedIn, onLogOut}) {

  return (
    <header className="header">
      <div className="logo">
        <img 
          className="header__logo" 
          src={headerLogo}
          alt="Логотип Место"
        />
      </div>
      <div className="header__sign">
        
        <Switch>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">Войти</Link>
          </Route>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">Регистрация</Link>
          </Route>
          <Route>
          <p className="header_email">{email}</p>
          {isLoggedIn && <button className="header__logout-button" onClick={onLogOut}>Выйти</button>}
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;