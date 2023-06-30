import React, { useEffect, useState } from 'react';
import { TodosType } from '../../types/types';
import { TodosContext } from './Context';
import MainTodos from './MainTodos'

const Todos = () => {
  const [todos, setTodos]=useState<TodosType[]>([]);
  const [perPage, setPerPage] = useState(10);
  const [error, setError] = useState<Error | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [editingTask, setEditingTask] = useState<string>('');
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  return (
    <TodosContext.Provider value={{todos, setTodos, perPage, setPerPage, error, setError, selectedTasks, setSelectedTasks, editingTask, setEditingTask, editedTitle, setEditedTitle, sortOption, setSortOption}}>
     <MainTodos></MainTodos>
    </TodosContext.Provider>
  );
};

export default Todos;