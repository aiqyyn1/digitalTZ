import { createContext } from 'react';
import { PostType as Post, UserType as User } from '../../types/types';
type Context = {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  Id: number;
  setPosts: [];
  handleDeletePost: (postId: number) => Promise<void>;
};
type PostProps = {
  posts: Post[],
  users: User[],
  error:Error | null,
  setError:(ids:Error)=>void
  setPosts: (ids: Post[]) => void,
  setUsers: (ids: User[]) => void,
  favoriteIds: number[],
  setFavoriteIds: (ids: number[] ) => void
  perPage: number,
  setPerPage: (a: number) => void,
  setSelectedPostIds: (a:number[]) => void
  selectedPostIds:number []

  // setIsChecked:(a:boolean) => void

};
export const FavoriteContext = createContext({} as PostProps);
export const MyContext = createContext({} as Context);
