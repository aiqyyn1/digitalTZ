import { createContext } from 'react';
import {
  PhotoType,
  PostType as Post,
  UserType as User,
} from '../../types/types';

type AlbumsProps = {
  posts: Post[];
  users: User[];
  error: Error | null;
  setError: (ids: Error) => void;
  setPosts: (ids: Post[]) => void;
  setUsers: (ids: User[]) => void;
  favoriteIds: number[];
  setFavoriteIds: (ids: number[]) => void;
  perPage: number;
  setPerPage: (a: number) => void;
  setSelectedPostIds: (a: number[]) => void;
  selectedPostIds: number[];
  showImages: boolean;
  setShowImage: (a: boolean) => void;
};
type Context = {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  Id: number;
  setPosts: [];
  handleDeletePost: (postId: number) => Promise<void>;
};
export const MyContext = createContext({} as Context);
export const AlbumsProvider = createContext({} as AlbumsProps);
