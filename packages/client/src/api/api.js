import axios from 'axios'
export default {
    user(route = '/user') {
        return {
            get: async(userId) => {
                let response = await fetch(`${route}?userId=${userId}`);
                let data = await response.json()
                return data
            },
            create: async(userId,email,firstName,lastName) => {
                let response = await fetch(route,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify({
                        userId: userId,
                        email: email,
                        firstName: firstName,
                        lastName: lastName
                    })
                })
                let data = await response.json();
                return data

            },
            update: async(field,value) => {
                let response = await fetch(route, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify({
                        field: field,
                        value: value
                    })
                })
                let data = await response.json()
                return data
            }
        }
    },
    item(route='/item') {
        return {
            get: async() => {
                let response = await fetch(`${route}`);
                let data = await response.json()
                return data
            },
            create: async(form) => {
               
                let data = axios.post(route, form)
                  .then(function (response) {
                    return response.data
                  })
                  .catch(function (error) {
                    return error
                  })
                  return data
            },
        }
    }
}