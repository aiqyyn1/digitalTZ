import React, { useContext, useState } from 'react';
import { AlbumsProvider } from './Context';
import { PostType } from '../../types/types';

type NewPostProps = {
  addNewPost: boolean;
  setAddNewPost: (a: boolean) => void;
};
const NewPost = ({ addNewPost, setAddNewPost }: NewPostProps) => {
  const { users, setPosts, posts } = useContext(AlbumsProvider);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [newPost, setNewPost] = useState('');

  const handleNewPost = () => {
    const post = {
      id: posts.length + 1,
      isFavorite: false,
      userId: parseInt(selectedUser),
      title: newPost,
    };
    const addData = [...posts, post];
    localStorage.setItem('page', String(addData.length));
    setPosts(addData);
    setAddNewPost(false);
    setSelectedUser('');
    setNewPost('');
  };
  console.log(posts);
  return (
    <div>
      {addNewPost && (
        <div className='fixed inset-0 flex items-center justify-center'>
          <div className='bg-slate-700 rounded-lg p-8 flex flex-col w-[300px]'>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className='mb-4'>
              <option value=''>Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <label>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className='mb-4 w-[235px]'></textarea>
            </label>
            <div className='flex justify-center'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={handleNewPost}>
                Add
              </button>
              <button
                className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4'
                onClick={() => setAddNewPost(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default NewPost;
