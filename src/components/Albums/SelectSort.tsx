import React, { useContext, useState } from 'react';
import { AlbumsProvider } from './Context';

const SelectSort = () => {
  const { posts, setPosts, users, favoriteIds } = useContext(AlbumsProvider);
  const [target, setTarget] = useState('');

  const sortByPostName = (selectedTarget: string) => {
    setTarget(selectedTarget);

    const sortedPosts = [...posts].sort((a, b) => {
      if (selectedTarget === 'ID') {
        return a.id - b.id;
      } else if (selectedTarget === 'Title') {
        return a.title.localeCompare(b.title);
      } else if (selectedTarget === 'UserName') {
        const userA = users.find((user) => user.id === a.userId);
        const userB = users.find((user) => user.id === b.userId);
        if (userA && userB && userA.name && userB.name) {
          return userA.name.localeCompare(userB.name);
        } else {
          return 0;
        }
      } else if (selectedTarget === 'Favorites') {
        const isAFavorite = favoriteIds.includes(a.id);
        const isBFavorite = favoriteIds.includes(b.id);
        return isAFavorite === isBFavorite ? 0 : isAFavorite ? -1 : 1;
      }
      return 0;
    });

    setPosts(sortedPosts);
  };

  const reverseSort = () => {
    const reversedPosts = [...posts].reverse();
    setPosts(reversedPosts);
  };

  return (
    <div className='grid gap-4'>
      <div className='border-8'>
        <select value={target} onChange={(e) => sortByPostName(e.target.value)}>
          <option>Choose</option>
          <option value='ID'>ID</option>
          <option value='Title'>Title</option>
          <option value='UserName'>UserName</option>
          <option value='Favorites'>Favorites</option>
        </select>
      </div>
      <div className='border-8'>
        <button onClick={reverseSort}>Reverse Sort</button>
      </div>
    </div>
  );
};

export default SelectSort;
