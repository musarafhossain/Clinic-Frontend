import BaseService from './BaseService';
import { ResponseModel, PageModel, PaymentHistoryModel } from '@/models';

export class PaymentHistoryService extends BaseService {
    static API_PREFIX = '/payment-history';
    static getList(params?: { search?: string; page?: number; limit?: number; patientId?: string; paymentDate?: string }): Promise<ResponseModel<PageModel<PaymentHistoryModel>>> {
        PaymentHistoryService.initCancelToken();
        return new Promise((resolve, reject) => {
            this.Http.get(this.API_PREFIX, {
                params: {
                    search: params?.search
                        ? encodeURIComponent(params.search)
                        : undefined,
                    page: params?.page ?? 1,
                    limit: params?.limit,
                    patientId: params?.patientId,
                    paymentDate: params?.paymentDate,
                },
                cancelToken: PaymentHistoryService.source?.token
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static create(patientId: string, params = {}): Promise<ResponseModel<PaymentHistoryModel>> {
        return new Promise((resolve, reject) => {
            this.Http.post(this.API_PREFIX + `/${patientId}`, params)
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static delete(id: string, params = {}): Promise<ResponseModel<PaymentHistoryModel>> {
        return new Promise((resolve, reject) => {
            this.Http.delete(`${this.API_PREFIX}/${id}`, {
                params,
                cancelToken: PaymentHistoryService.source?.token,
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }
}