// 文章详情接口
import instance from '../utils/instance'

export const getArticleDetailAPI = id => {
  return instance.get(`/v1_0/articles/${id}`)
}