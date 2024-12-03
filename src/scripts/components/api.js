//Настройки API
export const APIConfig = {
  token: "fa9dc152-8c7a-4633-a48f-c8640172c9b0",
  url: "https://nomoreparties.co/v1/pwff-cohort-1",
};

export function getCards() {
  return fetch(`${APIConfig.url}/cards`, {
    headers: {
      authorization: APIConfig.token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

export function getProfile() {
  return fetch(`${APIConfig.url}/users/me`, {
    headers: {
      authorization: APIConfig.token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

export function saveProfile(newData) {
  return fetch(`${APIConfig.url}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: APIConfig.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newData.title,
      about: newData.description,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

export function addCard(newCard) {
  return fetch(`${APIConfig.url}/cards`, {
    method: "POST",
    headers: {
      authorization: APIConfig.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

export function deleteCard(cardID) {
  return fetch(`${APIConfig.url}/cards/${cardID}`, {
    method: "DELETE",
    headers: {
      authorization: APIConfig.token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

export function putLike(cardID) {
  return fetch(`${APIConfig.url}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: {
      authorization: APIConfig.token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

export function deleteLike(cardID) {
  return fetch(`${APIConfig.url}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: {
      authorization: APIConfig.token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

export function setAvatar(url) {
  return fetch(`${APIConfig.url}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: APIConfig.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: url,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}
