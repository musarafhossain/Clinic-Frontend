import BaseService from './BaseService';
import { ResponseModel, PageModel, PatientModel } from '@/models';
import { PATIENT_STATUS } from '@/helpers/enum';

export class PatientService extends BaseService {
    static API_PREFIX = '/patients';
    static getList(params?: { search?: string; page?: number; status?: PATIENT_STATUS | '' }): Promise<ResponseModel<PageModel<PatientModel>>> {
        PatientService.initCancelToken();
        return new Promise((resolve, reject) => {
            this.Http.get(this.API_PREFIX, {
                params: {
                    search: params?.search,
                    page: params?.page ?? 1,
                    status: params?.status,
                },
                cancelToken: PatientService.source?.token
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static getById(id: string, params = {}): Promise<ResponseModel<PatientModel>> {
        PatientService.initCancelToken();

        return new Promise((resolve, reject) => {
            this.Http.get(`${this.API_PREFIX}/${id}`, {
                params,
                cancelToken: PatientService.source?.token,
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static create(params = {}): Promise<ResponseModel<PatientModel>> {
        return new Promise((resolve, reject) => {
            this.Http.post(this.API_PREFIX, params)
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static update(id: string, params = {}): Promise<ResponseModel<PatientModel>> {
        return new Promise((resolve, reject) => {
            this.Http.patch(`${this.API_PREFIX}/${id}`, params)
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static delete(id: string, params = {}): Promise<ResponseModel<PatientModel>> {
        return new Promise((resolve, reject) => {
            this.Http.delete(`${this.API_PREFIX}/${id}`, {
                params,
                cancelToken: PatientService.source?.token,
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static addPayment(patientId: string, params = {}): Promise<ResponseModel<any>> {
        return new Promise((resolve, reject) => {
            this.Http.post(`${this.API_PREFIX}/add-payment/${patientId}`, params)
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static deletePaymentHistory(id: string, params = {}): Promise<ResponseModel<any>> {
        return new Promise((resolve, reject) => {
            this.Http.delete(`${this.API_PREFIX}/payment-history/${id}`, {
                params,
                cancelToken: PatientService.source?.token,
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static getPatientPaymentHistory(params?: { search?: string; page?: number; limit?: number; patientId: string }): Promise<ResponseModel<PageModel<any>>> {
        return new Promise((resolve, reject) => {
            this.Http.get(this.API_PREFIX + '/payment-history', {
                params: {
                    search: params?.search
                        ? encodeURIComponent(params.search)
                        : undefined,
                    page: params?.page ?? 1,
                    limit: params?.limit,
                    patientId: params?.patientId,
                },
                cancelToken: PatientService.source?.token
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }
}
