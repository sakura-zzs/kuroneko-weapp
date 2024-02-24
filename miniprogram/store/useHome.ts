// 使用mobx进行状态管理
//observable用于创建store实例
//action用于创建修改store数据的函数
import {observable,action}from 'mobx-miniprogram'
interface IAvatar{
  url:string|null
}
interface ILabelList{
  createTime:string,
  icon:string,
  id:number,
  name:string,
  updateTime:string
}
interface IMomentImg{
  filename:string|null,
  id:number|null,
  mimetype:string|null,
  size:number|null,
  url:string|null
}
interface IProfile{
  birth:string,
  id:number,
  location:string,
  nickName:string,
  selfProfile:string,
  sex:string
}
interface IMomentData{
  avatar:IAvatar,
  commentCount:number,
  content:string,
  createTime:string,
  id:number,
  labelList:{id:number,name:string},
  momentImg:IMomentImg,
  profile:IProfile,
  title:string,
  updateTime:string,
  userId:number,
  html:string
}
export interface IHomeStoreThisType{
  labelList:Array<ILabelList>,
  momentList:Array<IMomentData>,
  labelMoment:Array<IMomentData>,
  momentData:IMomentData|undefined,
  isLogin:Boolean
}
const homeStore=observable({
  //数据
  labelList:[],
  momentList:[],
  labelMoment:[],
  momentData:"",
  isLogin:false,
  //修改数据的action
  setLabelList:action(function(this:IHomeStoreThisType,list:Array<ILabelList>){
    this.labelList=list
  }),
  setMomentList:action(function(this:IHomeStoreThisType,list:Array<IMomentData>){
    this.momentList=list
  }),
  setLabelMoment:action(function(this:IHomeStoreThisType,labelName:string){
    //mobx的state不能直接push
    let temList:Array<IMomentData>=[]
    this.momentList.forEach(e => {
      if(JSON.stringify(e?.labelList).indexOf(labelName)!==-1){
        temList.push(e)
      }
    })
    this.labelMoment=temList
  }),
  setMomentData:action(function(this:IHomeStoreThisType,id:number){
    this.momentData= this.momentList.find(e=>e.id===id)
  }),
  setLoginStatus:action(function(this:IHomeStoreThisType,isLogin:Boolean){
    this.isLogin=isLogin
  })
})
export default homeStore