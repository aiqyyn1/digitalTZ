import { Routes, Route } from 'react-router-dom';

import Post from './components/Post/Post';
import Album from './components/Albums/Album';

const PostList: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Post></Post>} path='/'></Route>
      <Route element={<Album></Album>} path='/image'></Route>
    </Routes>
  );
};

export default PostList;
