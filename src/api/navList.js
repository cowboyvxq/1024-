// 封装与文章相关API的接口
// import request from '../utils/request'
import instance from "../utils/instance";
import store from "../store/index";
//  获取用户频道列表
export const getChannelApi = () => {
  return instance.get("/v1_0/user/channels");
};

// 获取所有频道数据的 API
export const getAllChannelAPI = () => {
  return instance.get("/v1_0/channels");
};

// 更新用户频道列表数据的 API
export const updateUserChannelAPI = channels => {
  return instance.put('/v1_0/user/channels', {
    channels,
      headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
  })
}

/**
 * 添加用户频道
 */
export const addUserChannel = channel => {
  return instance({
    method: "PATCH",
    url: "/v1_0/user/channels",
    data: {
      channels: [channel]
    }
  });
};

/**
 * 删除用户指定频道
 */
export const deleteUserChannel = channelId => {
  return instance({
    method: "DELETE",
    url: `/v1_0/user/channels/${channelId}`
  });
};