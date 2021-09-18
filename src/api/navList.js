// 封装与文章相关API的接口
// import request from '../utils/request'
import instance from "../utils/instance";
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
    channels
  })
}