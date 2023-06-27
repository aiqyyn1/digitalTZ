import React, { ReactEventHandler, useState, useEffect } from 'react';
import { post } from '../api/api';
import DeleteModal from './DeleteModal';
import { MyContext } from './Context';
import Favorites from './Favorites';
const Delete = ({ Id, setPosts }: any) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeletePost = async (postId: number) => {
    try {
      const response = await post.delete('/' + postId);

      if (response.status === 200) {
        setPosts((prevPosts: any[]) =>
          prevPosts.filter((post: { id: number }) => post.id !== postId)
        );
      } else {
        console.error('Error deleting post:', response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <MyContext.Provider
      
        value={{ showModal, setShowModal, Id, setPosts, handleDeletePost }}>
        <button onClick={() => setShowModal(true)}>Delete</button>
       
        {showModal && <DeleteModal></DeleteModal>}
      </MyContext.Provider>
    </div>
  );
};

export default Delete;
