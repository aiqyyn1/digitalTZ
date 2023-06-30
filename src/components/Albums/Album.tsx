import React, { useState, useEffect } from 'react';
import { PostType, UserType } from '../../types/types';

import { AlbumsProvider } from './Context';

import { useNavigate } from 'react-router';
import Select from './Select';
import Edit from './Edit';
import Delete from './Delete';
import Favorites from './Favorites';
import Checkbox from './CheckBox';
import Comment from './Comment';
import NewPost from './NewPost';
import DeleteCheckBoxModal from './DeleteCheckBoxModal';
import FavoriteModel from './FavoriteModel';
import SelectSort from './SelectSort';
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
  const [addNewPost, setAddNewPost] = useState(false);
  const [selectedPostIds, setSelectedPostIds] = useState<number[]>([]);

  const [showImages, setShowImage] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showImages) {
      navigate('/images');
    }
  }, [showImages]);

  return (
    <AlbumsProvider.Provider
      value={{
        posts,
        setPosts,
        users,
        setUsers,
        error,
        showImages,
        setShowImage,
        setError,
        favoriteIds,
        setFavoriteIds,
        selectedPostIds,
        setSelectedPostIds,
        perPage,

        setPerPage,
      }}>
      <div>
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
                    className={`border-2 bg-teal-200 m-5 text-blue-950 w-5/6`}
                    key={post.id}>
                    <p className={'text-neutral-700'}>
                      User:{' '}
                      {users.find((user) => user.id === post.userId)?.name}
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
                  <button onClick={() => setShowFavorite(true)}>
                    Favorite
                  </button>
                </div>
              )}
            </div>

            <div className='border-8 h-[60px]'>
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
      </div>
    </AlbumsProvider.Provider>
  );
};

export default Album;
