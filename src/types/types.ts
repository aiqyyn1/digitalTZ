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
export interface PhotoType{
  id:number,
  url:string
  thumbnailUrl:string
  title:string

}
export interface TodosType{
  id:number,
  title:string
  completed:boolean
}