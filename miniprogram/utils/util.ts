import {BASE_URL} from '@services/config'

export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}
export const getEditorContents=(editor:any):Promise<any>=>{
  return new Promise((resolve,reject)=>{
    editor.kkEditor.getContents({
      success:res=>resolve(res),
      fail:err=>reject(err)
    })
  })
}
export const uploadImage=(filePath:string)=>{
  return new Promise((resolve,reject)=>{
    wx.uploadFile(
      {
        url:BASE_URL+'/upload/moment',
        //本地临时路径
        filePath,
        //图片上传字段
        name:'momentImg',
        success:res=>resolve(res),
        fail:err=>reject(err)
      })
  })
}