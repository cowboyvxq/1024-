import instance from "../utils/instance";
import store from "../store/index";

export const login = (data) => {
  return instance({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};

export const sendSms = (mobile) => {
  return instance({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
  });
};

export const getUserInfo = () => {
  return instance({
    method: "GET",
    url: "/v1_0/user",
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
  });
};

/**
 * 获取当前登录用户的个人资料
 */
export const getUserProfile = () => {
  return instance({
    method: "GET",
    url: "/v1_0/user/profile",
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
  });
};
/**
 * 更新用户资料
 */
export const updateUserProfile = (data) => {
  return instance({
    method: "PATCH",
    url: "/v1_0/user/profile",
    data,
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
  });
};

/**
 * 更新用户照片资料
 */
export const updateUserPhoto = (data) => {
  return instance({
    method: "PATCH",
    url: "/v1_0/user/photo",
    data,
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
  });
};

/**
 * 关注用户
 */
export const addFollow = target => {
  return instance({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    },
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
  })
}

/**
 * 取消关注用户
 */
export const deleteFollow = (target) => {
  return instance({
    method: "DELETE",
    url: `/v1_0/user/followings/${target}`,
  });
};
