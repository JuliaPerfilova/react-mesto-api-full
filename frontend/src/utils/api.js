import { apiOptions } from "./constants.js";

class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  setToken(token) {
    this._authorization = `Bearer ${token}`;
  }

  _makeRequest({ url, method, contentType, body }) {
    const requestInfo =  {
      headers: {}
    };

    if(this._authorization !== undefined) {
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
      method: 'PUT'
    });
  }

  dislikeCard(id) {
    return this._makeRequestAndGetJson({
      url: `${this._url}/cards/${id}/likes`, 
      method: 'DELETE'
    });
  }

  getInitialCards() {
    return this._makeRequestAndGetJson({
      url: `${this._url}/cards`
    });
  }

  getMyProfile() {
    return this._makeRequestAndGetJson({
      url: `${this._url}/users/me`
    });
  }

  updateProfile(userInfo) {
    return this._makeRequestAndGetJson({
      url: `${this._url}/users/me`,
      method: 'PATCH',
      contentType: 'application/json',
      body: JSON.stringify(userInfo)
    });
  }

  
  updateAvatar(avatarLink) {
    return this._makeRequestAndGetJson({
      url: `${this._url}/users/me/avatar`,
      method: 'PATCH',
      contentType: 'application/json',
      body: JSON.stringify({ avatar: avatarLink })
    });
  }

  createCard(data)  {
    return this._makeRequestAndGetJson({
      url: `${this._url}/cards`,
      method: 'POST',
      contentType: 'application/json',
      body: JSON.stringify(data)
    });
  }

  removeCard(id) {
    return this._makeRequest({
      url: `${this._url}/cards/${id}`, 
      method: 'DELETE'
    });
  }
}

const api = new Api(apiOptions);

export default api;
