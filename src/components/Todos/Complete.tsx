import React, { useContext } from 'react';
import { TodosContext } from './Context';
import { TodosType } from '../../types/types';
interface CompleteProps {
  Id:number,
  todo:TodosType
}
const Complete = ({Id, todo}:CompleteProps) => {
  const {todos, setTodos} =useContext(TodosContext)
  const handleTodoCompletion = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <div>
       <label>Complete</label>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => handleTodoCompletion(Id)}
              className='ml-1'
            ></input>
    </div>
  );
};

export default Complete;