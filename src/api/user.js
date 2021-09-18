import instance from "../utils/instance";


export const login = (data) => {
    return instance ({
        method:'POST',
        url:'/v1_0/authorizations',
        data
    })
}

export const sendSms = (mobile) => {
  return instance({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`
  });
};
