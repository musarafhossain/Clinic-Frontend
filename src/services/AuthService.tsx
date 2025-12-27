import BaseService from './BaseService';
import { ResponseModel, LoginResponseModel, UserModel } from '@/models';

export class AuthService extends BaseService {
    static API_PREFIX = '/auth';
    static login(params = {}): Promise<ResponseModel<LoginResponseModel>> {
        AuthService.initCancelToken();
        return new Promise((resolve, reject) => {
            this.Http.post(this.API_PREFIX + '/login', params, { cancelToken: AuthService.source?.token })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static me(params = {}): Promise<ResponseModel<UserModel>> {
        AuthService.initCancelToken();
        return new Promise((resolve, reject) => {
            this.Http.get(this.API_PREFIX + '/me', {
                params,
                cancelToken: AuthService.source?.token,
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }
}
