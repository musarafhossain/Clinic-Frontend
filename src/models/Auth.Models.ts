import { UserModel } from "./User.Models"

export class LoginModel {
    email!: string;
    password!: string;
}

export class LoginResponseModel {
    token!: string;
    user!: UserModel;
}