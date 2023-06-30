import React, { useState, useEffect, useCallback, useContext } from 'react';
import { post } from '../../api/api';
import { AlbumsProvider } from './Context';
import {Edit as EditButton} from 'tabler-icons-react'
import { PostType } from '../../types/types';

interface Post {
  Id: number;
  title: string;
  isFavorite: boolean;
}

const Edit = ({ Id, title, isFavorite }: Post) => {
  const [editingId, setEditingId] = useState<number | null>(null);

  const [updatedPost, setUpdatedPost] = useState<PostType>({
    id: 0,
    title: '',
    userId: 0,
    isFavorite: false,
  });
  const { posts, setPosts, error, setError, showImages, setShowImage } =
    useContext(AlbumsProvider);

  const toggleEditing = (postId: number): void => {
    if (editingId === postId) {
      setEditingId(null);
      setUpdatedPost({ id: 0, title: '', userId: 0, isFavorite: false });
    } else {
      const post = posts.find((p) => p.id === postId);
      if (post) {
        setEditingId(postId);
        setUpdatedPost({ ...post, userId: 0, isFavorite: false });
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
        await post.put(`/albums/${editingId}`, updatedPost);
        const updatedPosts = posts.map((post) =>
          post.id === editingId ? updatedPost : post
        );
        setPosts(updatedPosts);
        setEditingId(null);
        setUpdatedPost({ id: 0, title: '', userId: 0, isFavorite: false });
      } catch (error) {
        setError(error as Error);
      }
    }
  };

  const cancelChanges = useCallback((): void => {
    setEditingId(null);
    setUpdatedPost({ id: 0, title: '', userId: 0, isFavorite: false });
  }, []);
  if (error?.message && editingId === Id) {
    return <span>He re's the error: {error.message} </span>;
  }

  return (
    <div>
      {editingId === Id ? (
        <>
          <div className='flex '>
            <div>
              <input
                name='title'
                value={updatedPost.title}
                onChange={updatePost}
                className='w-[535px]'
              />
            </div>

            <button onClick={saveChanges} className='ml-5'>
              Save
            </button>
            <button onClick={cancelChanges} className='ml-1'>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p
            className={
              isFavorite
                ? 'text-red-700 cursor-pointer'
                : 'text-neutral-700 cursor-pointer'
            }
            onClick={() => setShowImage(true)}>
            {title}
          </p>

          <EditButton onClick={() => toggleEditing(Id)}></EditButton>
        </>
      )}
    </div>
  );
};

export default Edit;
