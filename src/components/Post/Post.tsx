import React, { useState, useEffect } from 'react';
import { PhotoType, PostType, UserType } from '../../types/types';
import Select from './Select';
import Edit from './Edit';
import { PostContext } from './Context';
import Delete from './Delete';
import Comment from './Comment';
import Checkbox from './Checkbox';
import NewPost from './NewPost';
import Favorites from './Favorites';
import FavoriteModel from './FavoriteModel';
import DeleteCheckBoxModal from './DeleteCheckBoxModal';
import SelectSort from './SelectSort';

import { useNavigate } from 'react-router';
const Album = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const storedIds = localStorage.getItem('favoriteIds');
  const initialFavoriteIds: number[] = storedIds ? JSON.parse(storedIds) : [];
  const [error, setError] = useState<Error | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<number[]>(initialFavoriteIds);
  const [perPage, setPerPage] = useState(10);
  const [showDelete, setShowDelete] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const [selectedPostIds, setSelectedPostIds] = useState<number[]>([]);
  const [addNewPost, setAddNewPost] = useState(false);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        users,
        setUsers,
        error,
        setError,
        favoriteIds,
        setFavoriteIds,
        selectedPostIds,
        setSelectedPostIds,
        perPage,
        setPerPage,
      }}>
      <div className='p-1.5rem bg-teal-100 w-full '>
        <Select />
        <hr></hr>
        <div className='flex justify-center mt-5'>
        <SelectSort></SelectSort>
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
                  className={`border-2 bg-teal-200 m-5 text-blue-950 w-full`}
                  key={post.id}>
                  <p className={'text-neutral-700'}>
                    User: {users.find((user) => user.id === post.userId)?.name}
                  </p>
                  <Edit
                    Id={post.id}
                    title={post.title}
                    isFavorite={favoriteIds.includes(post.id)}
                  />

                  <Delete Id={post.id} />
                  <Favorites Id={post.id} />

                  <Checkbox
                    Id={post.id}
                    isChecked={selectedPostIds.includes(post.id)}
                  />

                  <Comment Id={post.id} />
                </div>
              ))}
          </ul>
        </div>
      </div>
      <div className='bg-teal-100 flex justify-center h-1/2'>
        <div className='bg-teal-100 grid gap-4 w-[100px]'>
          <div className={selectedPostIds.length > 0 ? 'border-8  ' : ''}>
            {selectedPostIds.length > 0 && (
              <div>
                <button onClick={() => setShowDelete(true)}>Delete</button>
                <br></br>
                <button onClick={() => setShowFavorite(true)}>Favorite</button>
              </div>
            )}
          </div>

          <div className='border-8 w-36 flex justify-center'>
            <button onClick={() => setAddNewPost(true)}>Add new Album</button>
          </div>
          {addNewPost && (
            <NewPost
              addNewPost={addNewPost}
              setAddNewPost={setAddNewPost}></NewPost>
          )}

          {showDelete && (
            <DeleteCheckBoxModal
              showDelete={showDelete}
              setShowDelete={setShowDelete}></DeleteCheckBoxModal>
          )}
          {showFavorite && (
            <FavoriteModel
              showFavorite={showFavorite}
              setShowFavorite={setShowFavorite}></FavoriteModel>
          )}
          <div></div>

       
        </div>
      </div>
    </PostContext.Provider>
  );
};

export default Album;
