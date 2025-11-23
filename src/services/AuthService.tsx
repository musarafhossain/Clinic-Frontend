import BaseService from './BaseService';

export class AuthService extends BaseService {
    static API_PREFIX = '/auth';
    static login(params = {}): Promise<any> {
        AuthService.initCancelToken();
        return new Promise((resolve, reject) => {
            this.Http.post(this.API_PREFIX + '/login', params, { cancelToken: AuthService.source?.token })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }
}
