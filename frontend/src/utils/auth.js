const BASE_URL = 'https://api.mesto.perfilova.nomoredomains.sbs';

const makeRequest = ({ url, method, body, token }) => {
  const requestInfo =  {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if ( token !== undefined) {
    requestInfo.headers['Authorization'] = `Bearer ${token}`;
  }

  if(method !== undefined) {
    requestInfo.method = method;
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

  export const register = (email, password) => {
    return makeRequest({
      url: `${BASE_URL}/signup`, 
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(res => res);
  };

  export const authorize = (email, password) => {
    return makeRequest({
      url: `${BASE_URL}/signin`, 
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        return Promise.reject('Ошибка: ответ на запрос авторизации не содержит поле "token"');
      }
    });
  };

  export const checkToken = (token) => {
    return makeRequest({ 
      url: `${BASE_URL}/users/me`,
      method: 'GET',
      token
    })
    .then(res => res.json())
    .then(res => res.data)
  }