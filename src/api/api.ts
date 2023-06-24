import axios from "axios";

export const post = axios.create({
  baseURL:"https://jsonplaceholder.typicode.com/posts"
})
export const users = axios.create({
  baseURL:"https://jsonplaceholder.typicode.com/users"
})