export interface PostType {
  id: number;
  title: string;
  userId: number;
  isFavorite: boolean;
}

export interface UserType {
  id: number;
  name: string;
}