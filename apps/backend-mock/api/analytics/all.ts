import { verifyAccessToken } from '~/utils/jwt-utils';
import { MOCK_ANALYTICS } from '~/utils/mock-data';
import { unAuthorizedResponse } from '~/utils/response';

export default defineEventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const analytics =
    MOCK_ANALYTICS.find((item) => item.username === userinfo.username)?.data ??
    {};

  return useResponseSuccess(analytics);
});
