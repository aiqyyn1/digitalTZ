import React, { useContext } from 'react';
import { TodosType } from '../../types/types';
import { TodosContext } from './Context';
import { Edit as EditButton } from 'tabler-icons-react';
interface EditProps {
  Id:number,
  todo:TodosType
}
const Edit = ({Id, todo}:EditProps) => {
  const {setEditingTask, setEditedTitle, todos, editingTask, editedTitle, setTodos}=useContext(TodosContext)
  const handleEdit = (task: TodosType) => {
    setEditingTask(String(task.id));
    setEditedTitle(task.title);
  };
  const handleSave = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === parseInt(editingTask)) {
        return {
          ...todo,
          title: editedTitle,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
    setEditingTask('');
    setEditedTitle('');
  };
  return (
    <div>
        {parseInt(editingTask) === Id ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <EditButton onClick={() => handleEdit(todo)} />
          )}
    </div>
  );
};

export default Edit;