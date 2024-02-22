import kuronekoRequest from './index'

export const getLabelList=async ():Promise<any>=>{
  const res=await kuronekoRequest.get({url:'/label'})
  return res
}

export const getMomentList=async():Promise<any>=>{
  const res=await kuronekoRequest.get({url:'/moment'})
  return res
}