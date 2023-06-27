import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { users as userApi, post } from '../api/api';
import Comment from './Comment';
import Delete from './Delete';
import Edit from './Edit'
import Favorites from './Favorites';
import { FavoriteContext } from './Context';

export interface Post {
  id: number;
  title: string;
  userId:number
  isFavorite: boolean;
}

interface User {
  id: number;
  name: string;

}

const Post = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const fetchPosts = async (): Promise<void> => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const data = await response.data;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await userApi.get('/');
      const data = await response.data;
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };


  const handlePerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const perPageValue = parseInt(e.target.value, 10);
    setPerPage(perPageValue);
    localStorage.setItem('page', String(perPageValue));
  };
  
  const storedIds = localStorage.getItem('favoriteIds');
  const initialFavoriteIds: number[] = storedIds ? JSON.parse(storedIds) : [];
  const [favoriteIds, setFavoriteIds] = useState<number[]>(initialFavoriteIds);

  const handleToggleFavorite = (postId: number) => {
    const isFavorite = favoriteIds.includes(postId);
    const newFavoriteIds = isFavorite
      ? favoriteIds.filter((id) => id !== postId)
      : [...favoriteIds, postId];

    setFavoriteIds(newFavoriteIds);
    localStorage.setItem('favoriteIds', JSON.stringify(newFavoriteIds));

    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, isFavorite: !isFavorite } : post
    );
    setPosts(updatedPosts);
  };



  return (

    <div className='p-1.5rem bg-teal-100 w-full h-full'>
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
      <div className='flex justify-center border-2'>
        <ul>
          {posts
            .slice(
              0,
              !parseInt(String(localStorage.getItem('page')))
                ? 10
                : parseInt(String(localStorage.getItem('page')))
            )
            .map((post) => (
              <div
                className={`border-2 bg-teal-200 m-5 text-blue-950 w-[900px]`}
                key={post.id}>
                <p className='post-user'>
                  User: {users.find((user) => user.id === post.userId)?.name}
                </p>
               
               
                <Edit
  Id={post.id}
  title={post.title}
  posts={posts}
  setPosts={setPosts}
isFavorite={post.isFavorite}
 
></Edit>

                <Delete Id={post.id} setPosts={setPosts} />
                <button onClick={() => handleToggleFavorite(post.id)}>
              fff
                </button>
                <Comment Id={post.id} />
              </div>
            ))}
        </ul>
      </div>
      
    </div>

  );
};

export default Post;
