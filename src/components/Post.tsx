
import  { useState, useEffect } from 'react';
import { post, users as userApi } from '../api/api'
interface Post {
  id: number;
  title: string;
}
interface User {
  id :number,
  name:string
}
const Post = () => {

  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState <User[]>([])
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
   fetchPosts()
   fetchUsers()
  }, []);

 

  const fetchPosts = async (): Promise<void> => {
   try {
    const response = await post.get(
      `/`
    );
    const data = await response.data;
    setPosts(data);
   }
   catch(error){
    console.log(error)
   }
  };
  const fetchUsers = async ():Promise<void> => {
    try {
      const response = await userApi.get('/')
      const data = await response.data
      setUsers(data)
    }
    catch(error){
      console.log(error)
    }
  }


  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setPerPage(parseInt(e.target.value, 10));
    localStorage.setItem('page', e.target.value)
  };
  const handleDeletePost = async (postId:number) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId, {
        method: 'DELETE',
      });
 
      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } else {
        console.error('Error deleting post:', response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
     <div>
         <h2>Posts</h2>
      <label>
        Per Page:
        <select value={String(localStorage.getItem('page'))  } onChange={handlePerPageChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={'all'}>All</option>
        </select>
      </label>
    <div style={{display:'flex'}}>
      <ul>
        {posts.slice(0,
        !parseInt(String(localStorage.getItem('page'))) ? 10 : parseInt(String(localStorage.getItem('page'))) ).map((post, index) => (
          <div>
          <li key={post.id} >{
          post.title} 
          </li>
       
          <p className="post-user">User: {users.find((user) => user.id === post.id)?.name}</p>
          <button onClick={()=>handleDeletePost(post.id)}>Delete</button>
          </div>
        ))}
     

      </ul>
      
      </div>
     </div>
  );
};

export default Post;