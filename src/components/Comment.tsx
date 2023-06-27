import React from 'react';
import { post } from '../api/api';
import { useState } from 'react';
interface Comments {
  id:number,
  email:string,
  name:string,
  body:string
}

const Comment = ({Id}:any) => {
  const [postId, setPostId] = useState<number | null>(null);
  const [toggleComments, setToggleComments]= useState(false);
  const [comments, setComments]= useState<Comments[]>([]);

  const handleGetComments = async (postId:number):Promise<void>=>{

    
    try{
      const response = await post.get(`/${postId}/comments`)
      
       setComments(response.data)
       if (response.status === 200){
        setToggleComments(!toggleComments);
        setPostId(postId)
       }
    } 
    catch(error){
      console.log(error)
    }
}
  return (
    <div>
      
       <button onClick={()=>handleGetComments(Id)}>Comments</button>
          {toggleComments && postId === Id &&  comments.map((comment, index)=>(
            <div key={comment.id}>
              <p>Name : {comment.name}</p>
              <label>Email :{comment.email}</label>
              <br></br>
              <label> {index+1}) {comment.body}</label>
              <br></br>
            </div>
          ))}
    </div>
  );
};

export default Comment;