import instance from "@/utils/instance.js";
// 获取搜索结果
export const getSearchResultAPI = (kw, page) => {
  return instance.get("/v1_0/search", {
    params: {
      q: kw,
      page,
    },
  });
};
