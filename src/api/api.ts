import axios from "axios";

export const post = axios.create({
  baseURL:"https://jsonplaceholder.typicode.com/posts"
})
export const users = axios.create({
  baseURL:"https://jsonplaceholder.typicode.com/users"
})
export const albumsApi =axios.create({
  baseURL:'https://jsonplaceholder.typicode.com/albums'
})
export const photosApi= axios.create({
  baseURL:'https://jsonplaceholder.typicode.com/photos'
})
export const todosApi=axios.create({
  baseURL:"https://jsonplaceholder.typicode.com/todos"
})