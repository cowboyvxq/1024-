import instance from "../utils/instance";
// 获取文章下评论数据的 API
export const getCmtListAPI = (artId, offset) => {
  return instance.get("/v1_0/comments", {
    params: {
      // a 表示获取文章下的评论
      type: "a",
      // 文章的 Id
      source: artId,
      // 获取评论数据的偏移量，值为评论的 id。表示从此 id 的数据向后取，不传表示从第一页开始读取数据
      offset,
    },
  });
};

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
export const addLike = (target) => {
  return instance({
    method: "POST",
    url: "/v1_0/article/likings",
    data: {
      target,
    },
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
