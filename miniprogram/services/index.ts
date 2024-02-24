import {BASE_URL}from './config'
interface IRequestOptions{
  url:string,
  data?:any,
  header?:WechatMiniprogram.IAnyObject
}
class KuronekoRequest{
  BASE_URL:string
  constructor(BASE_URL:string){
    this.BASE_URL=BASE_URL
  }
  private request(option:WechatMiniprogram.RequestOption):Promise<any>{
    //携带token
    const token=wx.getStorageSync('token')
    return new Promise((resolve,reject)=>{
      wx.request({
        // 如果同名属性在展开运算符后，则展开运算符不会覆盖后面的同名属性
        ...option,
        url:this.BASE_URL+option.url,
        header:{...option.header,'AUTHORIZATION':`Bearer ${token}`},
        success:res=>resolve(res.data),
        fail:err=>reject(err)
      })
    })
  }
  get(option:IRequestOptions):Promise<any>{
    return this.request({...option,method:'GET'})
  }
  post(option:IRequestOptions):Promise<any>{
    return this.request({...option,method:'POST'})
  }
  put(option:IRequestOptions):Promise<any>{
    return this.request({...option,method:'PUT'})
  }
  delete(option:IRequestOptions):Promise<any>{
    return this.request({...option,method:'DELETE'})
  }
}
export default new KuronekoRequest(BASE_URL)