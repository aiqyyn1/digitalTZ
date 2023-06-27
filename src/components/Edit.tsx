import React, {useState, useEffect, useCallback, useContext} from 'react';
import { post } from '../api/api';
import { FavoriteContext } from './Context';
import Favorites from './Favorites';


interface Post {
  id: number;
  title: string;
}

interface EditProps {
  Id: number;
  title: string;
  posts: Post[];
  setPosts: ([]) => void;
  isFavorite: boolean
}

const Edit = ({
  Id,
  title,
  posts,
  setPosts,
  isFavorite
  
}: EditProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [updatedPost, setUpdatedPost] = useState<Post>({
    id: 0,
    title: '',
  });


 



  

  const toggleEditing = (postId: number): void => {
    if (editingId === postId) {
      setEditingId(null);
      setUpdatedPost({ id: 0, title: '' });
    } else {
      const post = posts.find((p) => p.id === postId);
      if (post) {
        setEditingId(postId);
        setUpdatedPost({ ...post });
      }
    }
  };

  const updatePost = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUpdatedPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const saveChanges = async (): Promise<void> => {
    if (editingId && updatedPost.title.trim() !== '') {
      try {
        await post.put(
          `https://jsonplaceholder.typicode.com/posts/${editingId}`,
          updatedPost
        );
        const updatedPosts = posts.map((post) =>
          post.id === editingId ? updatedPost : post
        );
        setPosts(updatedPosts);
        setEditingId(null);
        setUpdatedPost({ id: 0, title: '' });
      } catch (error) {
        console.log(error);
      }
    }
  };
 

  const cancelChanges = useCallback((): void => {
    setEditingId(null);
    setUpdatedPost({ id: 0, title: '' });
  },[]);
 
 




  return (
  
    <div>
      {/* <FavoriteContext.Provider value={{Id, isFavorite, setIsFavorite}}> */}
        {editingId === Id ? (
          <>
            <input
              name='title'
              value={updatedPost.title}
              onChange={updatePost}
            />
            <button onClick={saveChanges}>Save</button>
            <button onClick={cancelChanges}>Cancel</button>
          </>
        ) : (
          <>
<p className={isFavorite ? 'text-red-700' : 'text-neutral-700'}>{title}</p>

  <Favorites></Favorites>
          <button onClick={() => toggleEditing(Id)}>Edit</button>
        </>
      )}
            

         
        
 
            {/* </FavoriteContext.Provider> */}
    </div>


  );
};

export default Edit;
