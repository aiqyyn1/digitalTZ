import React, {
  ReactEventHandler,
  useState,
  useEffect,
  useContext,
} from 'react';
import { post } from '../../api/api';
import DeleteModal from './DeleteModal';
import { PostContext, MyContext } from './Context';
import { Eraser } from 'tabler-icons-react';
type DeleteProps = {
  Id: number;
};

const Delete = ({ Id }: DeleteProps) => {
  const [showModal, setShowModal] = useState(false);
  const { setPosts, posts, setError, error } = useContext(PostContext);

  const handleDeletePost = async (postId: number): Promise<void> => {
    try {
      const response = await post.delete('/' + postId);

      if (response.status === 200) {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
      } else {
        console.error('Error deleting post:', response.status);
      }
    } catch (error) {
      setError(error as Error);
    }
  };
  if (error?.message) {
    return <span>Here's the error: {error.message} </span>;
  }
  return (
    <div>
      <MyContext.Provider
        value={{ showModal, setShowModal, Id, setPosts: [], handleDeletePost }}>
        
        <Eraser onClick={() => setShowModal(true)}></Eraser>
        {showModal && <DeleteModal></DeleteModal>}
      </MyContext.Provider>
    </div>
  );
};

export default Delete;
