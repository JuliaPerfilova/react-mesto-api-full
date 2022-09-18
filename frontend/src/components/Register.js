import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PageForm from './PageForm.js';

function Register({ onRegisterSubmit, openInfoTooltip}) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegisterSubmit(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
      })
      .catch((err) => {
        openInfoTooltip(false, 'Что-то пошло не так! Попробуйте ещё раз.');
        console.log(err);
      });
  }

  return (
    <div className="sign-page">
      <PageForm
        formTitle="Регистрация"
        saveButtonText="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <label className="sign-page__form-field">
          <input
            className="sign-page__input sign-page__input_dark-theme"
            type="email"
            name="e-mail"
            placeholder="Email"
            required
            minLength="2"
            maxLength="40"
            value={email}
            onChange={handleEmailChange}
          />
          <span className="sign-page__input-error" id="email-error"></span>
        </label>
        <label className="sign-page__form-field">
          <input
            className="sign-page__input sign-page__input_dark-theme"
            type="password"
            name="password"
            placeholder="Пароль"
            required
            minLength="4"
            maxLength="40"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className="sign-page__input-error" id="password-error"></span>
        </label>
      </PageForm>
        <div className="sign-page__underline">
          <p className="sign-page__underline_text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="sign-page__underline_link">Войти</Link>
        </div>
    </div>
  )
}

export default withRouter(Register);