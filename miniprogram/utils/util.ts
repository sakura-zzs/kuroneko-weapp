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
/**
 * 
 * @param context 需要侦听的数据源上下文对象
 * @param obj 需要侦听的数据源
 * @param variableName 需要侦听的数据
 * @param callback 通过回调函数将侦听变化传递
 * @param deep 是否开启深层监听
 */
export const watch=(context,obj,variableName:string,callback:Function,deep?:Boolean)=>{
  let watchVal=obj[variableName]
  //深度监听，value不为空，且为对象时，遍历其所有key进行监听
  if(deep && watchVal !==null && typeof watchVal ==='object'){
    Object.keys(watchVal).forEach(key=>watch(context,watchVal,key,callback,deep))
  }
  Object.defineProperty(obj,variableName,{
    configurable:true,
    enumerable:true,
    get(){
      return watchVal
    },
    set(newVal){
      const oldVal=watchVal
      watchVal=newVal
      //重新深层监听，对象中的属性被覆盖之前的深层监听就失效了
      if(deep) watch(context,obj,variableName,callback,deep)
      //模拟observers，将新旧值传递出去
      callback.call(context,newVal,oldVal)
    }
  })
}
