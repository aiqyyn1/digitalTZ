import React, { useContext } from 'react';
import { FavoriteContext } from './Context';

type FavoritesProps = {
  Id: number;
};

const Favorites = ({ Id }: FavoritesProps) => {
  const { posts, setPosts, favoriteIds, setFavoriteIds, selectedPostIds, setSelectedPostIds } =
    useContext(FavoriteContext);

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


    if (selectedPostIds.includes(postId)) {
      const selectedPosts=selectedPostIds.filter((id)=> id !==postId);
      setSelectedPostIds(selectedPosts)
      
    }
  };

  return (
    <div>
      <button onClick={() => handleToggleFavorite(Id)}>Favorites</button>
    </div>
  );
};

export default Favorites;