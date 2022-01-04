import { IArticle } from "./article";
import { ICategory } from "./category";
import { IReporter } from "./reporter";
import { IRole } from "./Role";

export interface ResponseWithReporter{
  message:string;
  data:IReporter;
}

export interface ResponseWithArticle{
  message:string;
  data:IArticle;
}

export interface ResponseWithCategory{
  message:string;
  data:ICategory;
}

export interface ResponseWithCategoryArray{
  message:string;
  data:ICategory[];
}

export interface ResponseWithRoleArray{
  message:string;
  data: IRole[];
}

export interface PlainResponse{
  message:string;
}

export interface ErrorResponse{
  message:string;
  statusCode:number;
  errorMessage:string;
}

export interface SessionResponse{
  message:string;
  session:Session
}

export interface Session{
  token:string;
  expiresIn:string;
}
