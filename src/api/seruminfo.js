// 文章详情接口
import cnode from "../utils/cnode";

export const getArticleDetailAPI = (id) => {
  return instance.get(`/topic/${id}`);
};
