// 使用mobx进行状态管理
//observable用于创建store实例
//action用于创建修改store数据的函数
import {observable,action}from 'mobx-miniprogram'
export interface IHomeStoreThisType{
  labelList:Array<{}>
}
const homeStore=observable({
  //数据
  labelList:[],
  //修改数据的action
  setLabelList:action(function(this:IHomeStoreThisType,list:Array<{}>){
    this.labelList=list
  })
})
export default homeStore