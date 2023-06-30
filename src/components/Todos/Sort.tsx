import React, { useContext, useEffect } from 'react';
import Select from './Select';
import { TodosContext } from './Context';

const Sort = () => {
  const {sortOption, setSortOption }= useContext(TodosContext)
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
  };

  useEffect(() => {
    setSortOption('');
  }, []);


  return (
    <div>
        <Select />
        <hr></hr>
        <div className='flex justify-center mt-5'>
            <label htmlFor='sortOption'>Sort By:</label>
            <select id='sortOption' value={sortOption} onChange={handleSortChange}>
              <option value=''>None</option>
              <option value='title'>Title</option>
              <option value='completed'>Completed</option>
            </select>
          </div>
       
   
      </div>

  );
};

export default Sort;