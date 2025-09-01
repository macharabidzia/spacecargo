
export type IPostCourierCity = {
    id: number;
    desc: string;
};


export type IPostCourierPackage = {
    name: string;
    desc: string;
};

export type IPostCourierPostType = {
    name: string;
    desc: string;
};
export type IPostUserAddress = {
    address: string;
};
export type IPostAddCourierInfoData = {
    fromCities: IPostCourierCity[];
    packages: IPostCourierPackage[];
    postTypes: IPostCourierPostType[];
    toCities: IPostCourierCity[];
    userAddresses: IPostUserAddress[];
    userFullName: string;
};
export type IPostCourierDistrict = {
    id: number;
    desc: string;
};