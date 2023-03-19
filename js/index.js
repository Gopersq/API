const BASE_URL = 'https://intership-liga.ru/tasks';
 

const getUser = async (userId) => {
   try {
      const res = await fetch(`${BASE_URL}/${userId}`);

      if (res.ok) {
         const user = await res.json();
         console.log(`ПОЛУЧАЕМ ИНФОРМАЦИЮ О ${userId}: ${user}`)
      } else {
         throw new Error('Ошибка')
      }
   } catch (err) {
      console.log(`ПРИ ПОЛУЧЕНИИ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ ПРОИЗОШЛА ОШИБКА`)
   }
}

const patchUser = async (userId) => {
   try {
      const res = await fetch(`${BASE_URL}/${userId}`, {
         method: 'PATCH',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({
            info: "2222222"
         })
      });

      if (res.ok) {
         const updatedUser = await res.json();
         console.log(`ПОЛЬЗОВАТЕЛЬ УСПЕШНО ОБНОВЛЕН ${updatedUser}`)
      } else {
         throw new Error('Ошибка')
      }
   } catch (err) {
      console.log(`ПРИ ЧАСТИЧНОМ ОБНОВЛЕНИИ ПОЛЬЗОВАТЕЛЯ ПРОИЗОШЛА ОШИБКА`)
   }
}

const deleteUser = async (userId) => {
   try {
      const res = await fetch(`${BASE_URL}/${userId}`, {
         method: 'DELETE',
      });

      if (res.ok) {
         console.log(`ПОЛЬЗОВАТЕЛЬ ${userId} УДАЛЕН`)
      } else {
         throw new Error('Ошибка')
      }
   } catch (err) {
      console.log(`ПРИ УДАЛЕНИИ ПОЛЬЗОВАТЕЛЯ ПРОИЗОШЛА ОШИБКА`)
   }
}

const getAll = async () => {
   try {
      const res = await fetch(`${BASE_URL}`);

      if (res.ok) {
         const users = await res.json();
         console.log(`ПОЛУЧЕНА ИНФОРМАЦИЯ О ВСЕХ ПОЛЬЗОВАТЕЛЯХ ${users}`)
      } else {
         throw new Error('Ошибка')
      }
   } catch (err) {
      console.log(`ПРИ ПОЛУЧЕНИИ ВСЕХ ДАННЫХ ПРОИЗОШЛА ОШИБКА`)
   }
}

const createUser = async () => {
   try {
      const res = await fetch(`${BASE_URL}`, {
         method: 'POST',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({
            name: "Vadim",
            info: "1111111",
            isImportant: true
         })
      });

      if (res.ok) {
         const addedUser = await res.json();
         console.log(`СОЗДАН НОВЫЙ ПОЛЬЗОВАТЕЛЬ ${addedUser}`);
      } else {
         throw new Error('Ошибка');
      }
   } catch(err) {
      console.log(`ПРИ СОЗДАНИИ НОВОГО ПОЛЬЗОВАТЕЛЯ ПРОИЗОШЛА ОШИБКА`);
   }
}

getUser(1938)

patchUser(1938)

deleteUser(1952)

getAll();

createUser();




function sendRequest(method, url, body = null) {
   return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      xhr.responseType = 'json';
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = () => {
         if (xhr.status >= 400) {
            reject(xhr.response)
         } else {
            resolve(xhr.response)
         }
      }

      xhr.send(JSON.stringify(body));
   });
};

sendRequest('GET', `${BASE_URL}/1938`)
   .then((data => console.log(`ПОЛУЧАЕМ ИНФОРМАЦИЮ О 1938: ${data}`)))
   .catch((error) => console.warn(`ПРИ ПОЛУЧЕНИИ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ ПРОИЗОШЛА ОШИБКА`));

sendRequest('PATCH', `${BASE_URL}/1938`, { info: "2222222" })
   .then((data => console.log(`ПОЛЬЗОВАТЕЛЬ УСПЕШНО ОБНОВЛЕН ${data}`)))
   .catch((error) => console.warn(`ПРИ ЧАСТИЧНОМ ОБНОВЛЕНИИ ПОЛЬЗОВАТЕЛЯ ПРОИЗОШЛА ОШИБКА`));

sendRequest('GET', BASE_URL)
   .then((data => console.log(`ПОЛУЧЕНА ИНФОРМАЦИЯ О ВСЕХ ПОЛЬЗОВАТЕЛЯХ ${data}`)))
   .catch((error) => console.warn(`ПРИ ПОЛУЧЕНИИ ВСЕХ ДАННЫХ ПРОИЗОШЛА ОШИБКА`));

sendRequest('POST', BASE_URL, {
            name: "Vadim",
            info: "1111111",
            isImportant: true
         })
   .then((data => console.log(`СОЗДАН НОВЫЙ ПОЛЬЗОВАТЕЛЬ ${data}`)))
   .catch((error) => console.warn(`ПРИ СОЗДАНИИ НОВОГО ПОЛЬЗОВАТЕЛЯ ПРОИЗОШЛА ОШИБКА`));

const removeUser = (url) => new Promise((resolve, reject) => {
   const xhr = new XMLHttpRequest();
   xhr.open('DELETE', url);
   xhr.onload = () => resolve(xhr.response);
   xhr.onerror = () => reject(xhr.status);
   xhr.send();
});

removeUser(`${BASE_URL}/1960`)
   .then((data => console.log(`ПОЛЬЗОВАТЕЛЬ ${1959} УДАЛЕН`)))
   .catch((error) => console.warn(`ПРИ УДАЛЕНИИ ПОЛЬЗОВАТЕЛЯ ПРОИЗОШЛА ОШИБКА`));





const url = 'https://dog.ceo/api/breeds/image/random';
const btn = document.querySelector('.btn');
const img = document.querySelector('.img');

const randomDog = async () => {
   try {
      const res = await fetch(url);

      if (res.ok) {
         const data = await res.json();
         console.log(data);
         img.src = data.message;
      } else {
         throw new Error('Ошибка')
      }

   } catch (err) {
      console.log('Ошибка')
   }
}

btn.addEventListener('click', () => {
   let isLOaded = img.complete;

   if (isLOaded) {
      randomDog()
   }
})

randomDog()  