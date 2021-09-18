
import cnode from '../utils/cnode'
//  获取精华相关数据
export const getSerumApi = () => {
  return cnode.get("/topics")
}
 