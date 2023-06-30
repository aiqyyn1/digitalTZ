import React, { useContext,useEffect } from 'react';
import { TodosContext } from './Context';
import { todosApi } from '../../api/api';

const Select = () => {
  const {todos,setTodos, perPage, setPerPage, error, setError}=useContext(TodosContext);
  useEffect(()=>{
    fetchTodos()
      },[])
      const fetchTodos = async()=>{
        try{
          const response = await todosApi.get('/');
          setTodos(response.data);
        }catch(error){
          setError(error as Error)
        }
      }
      const handlePerPageChange = (
        e: React.ChangeEvent<HTMLSelectElement>
      ): void => {
        const perPageValue = parseInt(e.target.value, 10);
        setPerPage(perPageValue);
        localStorage.setItem('page', String(perPageValue));
      };
      if (error?.message) {
        return <span>Here's the error: {error.message} </span>;
      }
      
  return (
    <div>
      <div className='flex flex-col items-center'>
        <h2>Posts</h2>
        <label>
          Per Page:
          <select
            value={String(localStorage.getItem('page'))}
            onChange={handlePerPageChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={'all'}>All</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Select;