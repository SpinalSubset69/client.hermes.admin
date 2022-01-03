export interface IArticle {
  id:number;
  title: string;
  summary: string;
  content: string;
  likes?:number;
  category:string;
  created_At?:Date;
  images: Images[]
}

export interface Images{
  id:number;
  name:string
}

export interface ArticlesPagination{
  count:number;
  pageIndex:number;
  pageSize:number;
  data:IArticle[]
}
