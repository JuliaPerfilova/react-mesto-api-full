import { apiOptions } from "./constants.js";

class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  setToken(token) {
    this._authorization = `Bearer ${token}`;
  }

  removeToken() {
    delete this._authorization;
  }

  _makeRequest({ url, method, contentType, body, authorized }) {
    const requestInfo =  {
      headers: {}
    };

    if(authorized && this._authorization !== undefined) {
      requestInfo.headers.authorization = this._authorization;
    }

    if(method !== undefined) {
      requestInfo.method = method;
    }

    if (contentType !== undefined) {
      requestInfo.headers['Content-Type'] = contentType;
    }

    if (body !== undefined) {
      requestInfo.body = body;
    }

    return fetch(url, requestInfo)
    .then(res => {
      if (res.ok) {
        return Promise.resolve(res);
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  _makeRequestAndGetJson(data) {
    return this._makeRequest(data)
      .then(res => res.json());
  }

  likeCard(id) {
    return this._makeRequestAndGetJson({
      url: `${this._url}/cards/${id}/likes`, 
      method: 'PUT',
      authorized: true
    });
  }

  dislikeCard(id) {
    return this._makeRequestAndGetJson({
      url: `${this._url}/cards/${id}/likes`, 
      method: 'DELETE',
      authorized: true
    });
  }

  getInitialCards() {
    return this._makeRequestAndGetJson({
      url: `${this._url}/cards`,
      authorized: true
    });
  }

  getMyProfile() {
    return this._makeRequestAndGetJson({
      url: `${this._url}/users/me`,
      authorized: true
    });
  }

  updateProfile(userInfo) {
    return this._makeRequestAndGetJson({
      url: `${this._url}/users/me`,
      method: 'PATCH',
      contentType: 'application/json',
      body: JSON.stringify(userInfo),
      authorized: true
    });
  }

  
  updateAvatar(avatarLink) {
    return this._makeRequestAndGetJson({
      url: `${this._url}/users/me/avatar`,
      method: 'PATCH',
      contentType: 'application/json',
      body: JSON.stringify({ avatar: avatarLink }),
      authorized: true
    });
  }

  createCard(data)  {
    return this._makeRequestAndGetJson({
      url: `${this._url}/cards`,
      method: 'POST',
      contentType: 'application/json',
      body: JSON.stringify(data),
      authorized: true
    });
  }

  removeCard(id) {
    return this._makeRequest({
      url: `${this._url}/cards/${id}`, 
      method: 'DELETE',
      authorized: true
    });
  }

  register(email, password) {
    return this._makeRequestAndGetJson({
      url: `${this._url}/signup`,
      method: 'POST',
      contentType: 'application/json',
      body: JSON.stringify({ email, password }),
      authorized: false
    });
  }

  authorize(email, password) {
    return this._makeRequestAndGetJson({
      url: `${this._url}/signin`, 
      method: 'POST',
      contentType: 'application/json',
      body: JSON.stringify({ email, password }),
      authorized: false
    });
  };

  checkToken() {
    return this._makeRequestAndGetJson({
      url: `${this._url}/users/me`,
      method: 'GET',
      authorized: true
    });
  }
}

const api = new Api(apiOptions);

export default api;
