import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://crudcrud.com/api/b50ceb1ba5554771b535e62811e147f8',
    timeout: 10000,
  });