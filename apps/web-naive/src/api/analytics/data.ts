import { requestClient } from '#/api/request';

export namespace Analytics {
  /** 登录接口参数 */
  export interface prices {
    text: string;
    value: number;
  }
}

/**
 * 获取用户权限码
 */
export async function getAnalyticsData() {
  return requestClient.get<object>('/analytics/all');
}
