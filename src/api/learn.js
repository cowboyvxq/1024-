import cnode from '../utils/cnode'

export const getLearnApi = () => {
  return cnode.get("/topics/tab=share");
};
