export interface IAuthor {
    firstname: string;
    middlename: string;
    lastname: string;
}

export const defaultAuthor: IAuthor = {
    firstname: '',
    lastname: '',
    middlename: ''
}

export interface IReference {
    type: string;
    publisher: string;
    authors: IAuthor[];
    title: string;
    volume: number;
    pages: number;
    year: number;
}

export interface IMaterial {
    composition: string,
    details: string,
    id: number
}

export interface IVariable {
    name: string;
    repr: string;
    units: string;
}

export const defaultVariable: IVariable = {
    name: '',
    repr: '',
    units: '',
}

export interface IContent {
    point: number[];
    comments: string;
}

export interface IData {
    variables: IVariable[];
    contents: IContent[];
    comments: string;
}

export interface IDataSetModel {
    reference: IReference;
    dataset_name: string;
    material: IMaterial[];
    category: string;
    subcategory: string;
    data_type: string;
    data: IData;
}

