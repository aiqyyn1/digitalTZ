import React, {useState, useEffect, useContext} from 'react';
import { post, users as userApi } from '../../api/api';
import { FavoriteContext } from './Context';
import { PostType, UserType } from '../../types/types';


const Select = () => {


  const {setPosts, setUsers, setPerPage, setError, perPage,error}=useContext(FavoriteContext)
  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, [perPage]);



  const fetchPosts = async (): Promise<void> => {
    try {
      const response = await post.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const data = await response.data;
      setPosts([...data].slice(0,perPage));
    } catch (error) {
      setError(error as Error)
    }
  };


 const fetchUsers = async (): Promise<void> => {
    try {
      const response = await userApi.get('/');
      const data = await response.data;
      setUsers(data);
    } catch (error) {
      setError(error as Error)
    }
  };

  


  const handlePerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const perPageValue = parseInt(e.target.value, 10);
    setPerPage(perPageValue);
    localStorage.setItem('page', String(perPageValue));
  };
  if (error?.message ){
    return <span>Here's the error: {error.message} </span>
   }
  return (
    <div>
       <div className='flex flex-col items-center'>
        <h2>Posts</h2>
        <label>
          Per Page:
          <select
            value={String(localStorage.getItem('page'))}
            onChange={handlePerPageChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={'all'}>All</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Select;