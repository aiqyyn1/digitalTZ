import {Routes, Route} from 'react-router-dom'

import Post from './components/Post'



const PostList: React.FC = () => {



  return (
    <Routes>
      <Route index element={<Post></Post>} path='/'></Route>
    </Routes>
  );
};

export default PostList;