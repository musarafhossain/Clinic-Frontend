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

    static sendOtp(params = {}): Promise<ResponseModel<{ email: string }>> {
        AuthService.initCancelToken();
        return new Promise((resolve, reject) => {
            this.Http.post(this.API_PREFIX + '/send-otp', params, { cancelToken: AuthService.source?.token })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static verifyOtp(params = {}): Promise<ResponseModel<any>> {
        AuthService.initCancelToken();
        return new Promise((resolve, reject) => {
            this.Http.post(this.API_PREFIX + '/verify-otp', params, { cancelToken: AuthService.source?.token })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static resetPassword(params = {}): Promise<ResponseModel<LoginResponseModel>> {
        AuthService.initCancelToken();
        return new Promise((resolve, reject) => {
            this.Http.post(this.API_PREFIX + '/reset-password', params, { cancelToken: AuthService.source?.token })
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
