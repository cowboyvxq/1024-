/**
 * 评论请求模块
 */
import instance from '@/utils/instance'

// 获取文章下评论数据的 API
export const getCmtListAPI = (artId, offset) => {
  return instance.get('/v1_0/comments', {
    params: {
      // a 表示获取文章下的评论
      type: 'a',
      // 文章的 Id
      source: artId,
      // 获取评论数据的偏移量，值为评论的 id。表示从此 id 的数据向后取，不传表示从第一页开始读取数据
      offset
    }
  })
}
 
// 评论点赞的 API
export const addLikeCmtAPI = cmtId => {
  return instance.post('/v1_0/comment/likings', {
    target: cmtId,
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
  })
}

// 评论取消点赞的 API
export const delLikeCmtAPI = cmtId => {
  return instance.delete(`/v1_0/comment/likings/${cmtId}`)
}

/**
 * 发布文章评论或评论回复
 */
export const addComment = data => {
  return instance({
    method: 'POST',
    url: '/v1_0/comments',
    data,
     headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
  })
}
