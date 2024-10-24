import { defineStore } from 'pinia';

import { getAnalyticsData } from '#/api';

export const useAnalyticStore = defineStore('analytics', () => {
  // const router = useRouter();

  async function fetchAnalytics() {
    let data: null | object = null;
    data = await getAnalyticsData();
    // userStore.setUserInfo(userInfo);
    return data;
  }

  return {
    fetchAnalytics,
  };
});
