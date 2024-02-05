import kuronekoRequest from './index'

export const login =async(code:string):Promise<any>=>{
  const res=await kuronekoRequest.post({url:'/wxLogin',data:{code}})
  return res
}
export const bindAccountAndLogin=async(code:string,email:string,pwd:string):Promise<any>=>{
  const res=await kuronekoRequest.put({url:'/bindWxUser',data:{email,pwd,code}})
  return res
}