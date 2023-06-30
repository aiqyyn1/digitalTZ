import React, { useContext, useState, useEffect } from 'react';
import { TodosContext } from './Context';
import Select from './Select';
import { TodosType } from '../../types/types';
import Edit from './Edit';
import Complete from './Complete';
import Sort from './Sort';

const MainTodos = () => {
  const { todos, setTodos, selectedTasks,setSelectedTasks,setSortOption,sortOption, editingTask, editedTitle, setEditedTitle} = useContext(TodosContext);

  const handleTaskSelection = (id: number) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

 

  const handleDeleteSelectedTasks = () => {
    const updatedTodos = todos.filter((todo) => !selectedTasks.includes(todo.id));
    setTodos(updatedTodos);
    setSelectedTasks([]);
  };



 
  const sortedTodos = todos
    .slice(0, !parseInt(String(localStorage.getItem('page'))) ? 10 : parseInt(String(localStorage.getItem('page'))))
    .sort((a, b) => {
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'completed') {
        return a.completed ? 1 : -1;
      } else {
        return a.id - b.id;
      }
    })
    .map((todo) => (
      <div className='border-2 bg-teal-200 m-5 text-blue-950 w-5/6' key={todo.id}>
        <div>
          {parseInt(editingTask) === todo.id ? (
            <input
              type='text'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <p className={todo.completed ? 'text-neutral-700 line-through' : 'text-neutral-700'}>
              {todo.title}
            </p>
          )}
          <div>
            <Complete Id={todo.id} todo={todo}></Complete>
          </div>
         <Edit Id={todo.id} todo={todo}></Edit>
        </div>
        <div>
          <input
            type='checkbox'
            checked={selectedTasks.includes(todo.id)}
            onChange={() => handleTaskSelection(todo.id)}
          />
        </div>
      </div>
    ));

  return (
    <div>
        <div className='h-full bg-teal-100'>
      <div className='p-1.5rem'>
        <Sort></Sort>
    <div className='flex justify-center'>
        

    <ul>{sortedTodos}</ul>
  </div>
  <div className='flex justify-center items-center'>
<div className={selectedTasks.length > 0 ?'border-4 border-red-500   w-32': '' }>
  {selectedTasks.length > 0 && (
    <button onClick={handleDeleteSelectedTasks}>Delete Selected</button>
  )}
  </div>
</div>
</div>
</div>
</div>

  );
};

export default MainTodos;
