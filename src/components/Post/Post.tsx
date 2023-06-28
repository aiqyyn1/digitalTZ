import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import Delete from './Delete';
import Edit from './Edit';
import Favorites from './Favorites';
import { FavoriteContext } from './Context';
import Select from './Select';
import { PostType } from '../../types/types';
import { UserType } from '../../types/types';
import Checkbox from './Checkbox';
import DeleteModal from './DeleteModal';
import DeleteCheckBoxModal from './DeleteCheckBoxModal';
import FavoriteModel from './FavoriteModel';

const Post = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const storedIds = localStorage.getItem('favoriteIds');
  const initialFavoriteIds: number[] = storedIds ? JSON.parse(storedIds) : [];
  const [error, setError] = useState<Error | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<number[]>(initialFavoriteIds);
  const [perPage, setPerPage] = useState(10);
  const [showDelete, setShowDelete]=useState(false);
  const [showFavorite, setShowFavorite]=useState(false);
  const [selectedPostIds, setSelectedPostIds] = useState<number[]>([]); // Keep track of selected post IDs
  
   

  const handleDeletePosts = () => {

    const updatedPosts = posts.filter((post) => !selectedPostIds.includes(post.id));
    setPosts(updatedPosts);
  
    setShowDelete(true);
    setSelectedPostIds([]);
  };
  const handleToggleFavorite = () => {
    const updatedPosts = posts.map((post) => {
      if (selectedPostIds.includes(post.id)) {
        const isFavorite = favoriteIds.includes(post.id);
        return { ...post, isFavorite: !isFavorite };
      }
      return post;
    });
  
    const updatedFavoriteIds = updatedPosts.reduce((ids, post) => {
      if (post.isFavorite) {
        ids.push(post.id);
      } else {
        const index = ids.indexOf(post.id);
        if (index !== -1) {
          ids.splice(index, 1);
        }
      }
      return ids;
    }, [...favoriteIds]);
  
    setFavoriteIds(updatedFavoriteIds);
    localStorage.setItem('favoriteIds', JSON.stringify(updatedFavoriteIds));
  
    setPosts(updatedPosts);
    setSelectedPostIds([]); 
  };

  
  
  
  return (
    <FavoriteContext.Provider
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
     
      }}
    >
      <div className="p-1.5rem bg-teal-100 w-full h-full">
        <Select />
        <div>
       
        </div>
        <div className="flex justify-center border-2">
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
                  key={post.id}
                >
                  <p className={'text-neutral-700'}>
                    User: {users.find((user) => user.id === post.userId)?.name}
                  </p>
                  <Edit Id={post.id} title={post.title} isFavorite={favoriteIds.includes(post.id)} />

                
                  
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
          <div>
          {selectedPostIds.length> 0 && (
            <div>
          <button onClick={()=>setShowDelete(true)}>Delete</button>
          <br></br>
          <button onClick={()=>setShowFavorite(true)}>Favorite</button>
          </div>
        )}
        {showDelete && <DeleteCheckBoxModal showDelete={showDelete} setShowDelete={setShowDelete} handleDeletePosts={handleDeletePosts}></DeleteCheckBoxModal>}
        {showFavorite && <FavoriteModel showFavorite={showFavorite} setShowFavorite={setShowFavorite} handleToggleFavorite={handleToggleFavorite} ></FavoriteModel>}
        </div>
        </div>
      
        </div>

    </FavoriteContext.Provider>
  );
};

export default Post;