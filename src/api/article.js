import instance from "../utils/instance";
import store from "../store/index";

/**
 * 获取文章评论列表
 */
export const getComments = params => {
  return instance({
    method: 'GET',
    url: '/v1_0/comments',
    // GET 参数使用 params 进行传递
    // 我们写的时候是对象，但是最终发给后端的数据是？
    // axios 会把 params 对象转为 key=value?key=value 的格式放到 url 中发送
    params
  })
}

/**
 * 获取文章列表
 */
export const getArticles = (params) => {
  return instance({
    method: "GET",
    url: "/v1_0/articles",
    // params 选项用来配置 Query 参数
    params,
  });
};

/**
 * 获取文章
 */
export const getArticleById = (articleId) => {
  return instance({
    method: "GET",
    url: `/v1_0/articles/${articleId}`,
  });
};

/**
 * 收藏文章
 */
export const addCollect = (target) => {
  return instance({
    method: "POST",
    url: "/v1_0/article/collections",
    data: {
      target,
    },
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
  });
};

/**
 * 取消收藏文章
 */
export const deleteCollect = (target) => {
  return instance({
    method: "DELETE",
    url: `/v1_0/article/collections/${target}`,
  });
};

/**
 * 点赞文章
 */
export const addLike = target => {
  return instance({
    method: "POST",
    url: "/v1_0/article/likings",
    data: {
      target
    }
  });
};

/**
 * 取消点赞文章
 */
export const deleteLike = (target) => {
  return instance({
    method: "DELETE",
    url: `/v1_0/article/likings/${target}`,
  });
};
