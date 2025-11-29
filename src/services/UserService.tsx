import BaseService from './BaseService';
import { ResponseModel, PageModel, UserModel } from '@/models';

export class UserService extends BaseService {
    static API_PREFIX = '/users';
    static getList(params?: { search?: string; page?: number }): Promise<ResponseModel<PageModel<UserModel>>> {
        UserService.initCancelToken();
        return new Promise((resolve, reject) => {
            this.Http.get(this.API_PREFIX, {
                params: {
                    search: params?.search,
                    page: params?.page ?? 1,
                },
                cancelToken: UserService.source?.token
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static getById(id: string, params = {}): Promise<ResponseModel<UserModel>> {
        UserService.initCancelToken();

        return new Promise((resolve, reject) => {
            this.Http.get(`${this.API_PREFIX}/${id}`, {
                params,
                cancelToken: UserService.source?.token,
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static create(params = {}): Promise<ResponseModel<UserModel>> {
        return new Promise((resolve, reject) => {
            this.Http.post(this.API_PREFIX, params)
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static update(id: string, params = {}): Promise<ResponseModel<UserModel>> {
        return new Promise((resolve, reject) => {
            this.Http.patch(`${this.API_PREFIX}/${id}`, params)
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static delete(id: string, params = {}): Promise<ResponseModel<UserModel>> {
        return new Promise((resolve, reject) => {
            this.Http.delete(`${this.API_PREFIX}/${id}`, {
                params,
                cancelToken: UserService.source?.token,
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }
}
