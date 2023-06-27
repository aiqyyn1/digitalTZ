import { createContext } from 'react';
type Context = {
  setShowModal : (show:boolean)=>void ,
  showModal:boolean
  Id:number,
  setPosts:[],
 handleDeletePost: (postId: number) => Promise<void>
}
type FavoriteProps = {
  Id:number
  isFavorite:boolean
  setIsFavorite:(a:boolean)=>void
}
export const FavoriteContext=createContext({}as FavoriteProps)
export const MyContext = createContext({} as Context );