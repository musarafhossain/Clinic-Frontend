import BaseService from './BaseService';
import { ResponseModel } from '@/models';

export class StatService extends BaseService {
    static API_PREFIX = '/stats';
    static home(params?: { today?: string; }): Promise<ResponseModel<any>> {
        StatService.initCancelToken();
        return new Promise((resolve, reject) => {
            this.Http.get(this.API_PREFIX + '/home', {
                params: {
                    today: params?.today,
                },
                cancelToken: StatService.source?.token
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }
}
