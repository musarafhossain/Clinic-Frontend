import BaseService from './BaseService';
import { ResponseModel, PageModel, NotificationModel } from '@/models';

export class NotificationService extends BaseService {
    static API_PREFIX = '/notifications';
    static getList(params?: { search?: string; page?: number; read?: boolean | ''; limit?: number }): Promise<ResponseModel<PageModel<NotificationModel>>> {
        NotificationService.initCancelToken();
        return new Promise((resolve, reject) => {
            this.Http.get(this.API_PREFIX, {
                params: {
                    search: params?.search,
                    page: params?.page ?? 1,
                    read: params?.read,
                    limit: params?.limit ?? 10,
                },
                cancelToken: NotificationService.source?.token
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static markAsRead(id: string): Promise<ResponseModel<any>> {
        NotificationService.initCancelToken();
        return new Promise((resolve, reject) => {
            this.Http.patch(`${this.API_PREFIX}/${id}/read`, {
                cancelToken: NotificationService.source?.token
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static markAllAsRead(): Promise<ResponseModel<any>> {
        NotificationService.initCancelToken();
        return new Promise((resolve, reject) => {
            this.Http.patch(`${this.API_PREFIX}/read-all`, {
                cancelToken: NotificationService.source?.token
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }
}
