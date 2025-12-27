import BaseService from './BaseService';
import { ResponseModel, PageModel, PatientModel } from '@/models';
import { PATIENT_STATUS } from '@/helpers/enum';

export class AttendanceService extends BaseService {
    static API_PREFIX = '/attendances';
    static getList(params?: { date?: any; search?: string; page?: number; status?: PATIENT_STATUS | '' }): Promise<ResponseModel<PageModel<PatientModel>>> {
        AttendanceService.initCancelToken();
        return new Promise((resolve, reject) => {
            this.Http.get(this.API_PREFIX, {
                params: {
                    date: params?.date,
                    search: params?.search,
                    page: params?.page ?? 1,
                    status: params?.status,
                },
                cancelToken: AttendanceService.source?.token
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static markAttendance(params = {}): Promise<ResponseModel<any>> {
        return new Promise((resolve, reject) => {
            this.Http.post(this.API_PREFIX + '/mark-attendance', params)
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }

    static getListByPatientId(patientId: string, params?: { search?: string; page?: number; limit?: number; }): Promise<ResponseModel<PageModel<any>>> {
        return new Promise((resolve, reject) => {
            this.Http.get(this.API_PREFIX + `/${patientId}`, {
                params: {
                    search: params?.search
                        ? encodeURIComponent(params.search)
                        : undefined,
                    page: params?.page ?? 1,
                    limit: params?.limit,
                },
                cancelToken: AttendanceService.source?.token
            })
                .then((res) => resolve(res?.data))
                .catch((err) => reject(err));
        });
    }
}
