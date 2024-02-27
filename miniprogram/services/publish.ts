import kuronekoRequest from './index'

export const createMoment=async (title:string,html:string)=>{
  const {insertId}=await kuronekoRequest.post({url:'/moment',data:{title,html}})
  return insertId
}
export const imagesBindToMoment=(imgLinks:Array<{url:String,id:Number}>,momentId:Number)=>{
  imgLinks.forEach(async (item) => {
    const id = item.id
    await kuronekoRequest.put({ url: `/upload/moment/${id}`, data: { momentId } })
  })
}
export const labelsBindToMoment=(labelList:Array<String>,momentId:Number)=>{
  labelList.forEach(async (labelName) => {
    await kuronekoRequest.post({ url: `/moment/${momentId}/label`, data: { labelName } })
})
}