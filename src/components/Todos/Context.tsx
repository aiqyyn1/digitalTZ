import { createContext} from "react";
import { TodosType } from "../../types/types";

 type ContextProps={
   todos:TodosType[],
   setTodos:(a:TodosType[])=>void
   perPage: number;
   setPerPage: (a: number) => void;
   error: Error | null;
   setError: (ids: Error) => void;
   setSortOption:(ids:string)=>void,
   selectedTasks:number[]
    setSelectedTasks:(ids:number[])=>void
    editingTask:string;
     setEditingTask:(ids:string)=>void;
     editedTitle:string;
      setEditedTitle:(ids:string)=>void;
      sortOption:string
  
 }
 export const TodosContext=createContext({} as ContextProps)