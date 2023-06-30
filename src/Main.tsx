import { Routes, Route } from 'react-router-dom';

import Post from './components/Post/Post';
import Album from './components/Albums/Album';
import Photots from './components/Albums/Photos';
import Todos from './components/Todos/Todos';


const PostList: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Post></Post>} path='/'></Route>
      <Route element={<Album></Album>} path='/image'></Route>
      <Route element={<Photots></Photots>} path='/images'></Route>
      <Route element={<Todos></Todos>} path='/todos'></Route>
    </Routes>
  );
};

export default PostList;
