import { ICategoryShow } from "./ICategoryShow";

export interface IGetCategories {
    content: ICategoryShow[],
    totalPages: number,
    totalElements: number,
    number: number
}
export interface ICategorySearch {
    name: string,
    description: string,
    page: number,
    size: number
}