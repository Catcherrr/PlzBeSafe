//회원가입 데이터
export interface IUserData {
    email: string;
    password: string;
    passwordComfirmaion: string;
    name: string;
    age: number;
    gender: number;
    address: string;
}

export interface IEmailData {
    id: string;
}

//로그인 데이터
export interface ILoginData {
    email: string;
    password: string;
}

//비밀번호 수정데이터
export interface IPasswordData {
    password: string;
    passwordComfirmaion: string;
    jwt: string;
}

//내 정보 수정데이터
export interface IModifyData {
    jwt: string;
    name: string;
    age: number;
    gender: number;
    address: string;
}

//마이페이지 데이터
export interface IMypageData {
    jwt: string;
}
