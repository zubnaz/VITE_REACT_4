export interface ICategoryEdit {
    id: number,
    name: string,
    description: string,
    image: File | undefined
}
export interface IUploadedFile {
    originFileObj: File
}
export interface IUploadImage {
    int: number,
    name: string
}