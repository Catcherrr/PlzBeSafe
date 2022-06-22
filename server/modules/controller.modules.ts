export interface serviceReturnForm {
    status: number;
    message: string;
    responseData: Object;
}

export const statusTrans = (num: number) => {
    return Math.floor(num / 10);
};
