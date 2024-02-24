// pages/index.ts
import {login,bindAccountAndLogin,checkLogin} from '@services/user'
import {createStoreBindings}from 'mobx-miniprogram-bindings'
import homeStore from'@store/useHome'
import {getLabelList, getMomentList}from '@services/home'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:"",
    labelList:[],
    momentList:[],
    labelMoment:[],
    loginStatus:false,
    active:0
  },
  async getLabel(this:any){
    const res=await getLabelList()
    this.setLabelList(res)
  },
  async getMoment(this:any){
    const res=await getMomentList()
    this.setMomentList(res)
  },
  //检测登录状态
  async getLoginStatus(this:any){
    const loginStatus=await checkLogin()
    this.setLoginStatus(loginStatus)
  },
  initLabelMoment(this:any){
    this.setLabelMoment(this.data.labelList[0].name)
  },
  getLabelMoment(this:any,labelName:string){
    this.setLabelMoment(labelName)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(this:any) {
    //获取标签数据
    //使用createStoreBindings将store数据映射到页面实例中
    this.homeStore=createStoreBindings(this,{
      store:homeStore,
      fields:['labelList','momentList','labelMoment','loginStatus'],
      actions:['setLabelList','setMomentList','setLabelMoment','setLoginStatus']
    })
    
    await this.getLabel()
    await this.getMoment()
    this.initLabelMoment()
    //code只能使用一次，再次使用需要重新获取
    // const {code}=await wx.login()
    // const res=await login(code)
    // console.log(res)
    // if(res.code===1008){
    //   //未注册
    //   //模拟登录未注册，帐号绑定测试
    //   const {code}=await wx.login()
    //   const {token}=await bindAccountAndLogin(code,'2052400186@qq.com','123456')
    //   console.log(token)
    // }
  },
  showLabelMoment(data:any){
    this.getLabelMoment(data.detail.title)
  },
  goToArticleDetail(e:WechatMiniprogram.BaseEvent){
    // 小程序的事件处理函数传参需要通过data-传递
    wx.navigateTo({
      url:e.currentTarget.dataset.path,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload(this:any) {
    //卸载store
    this.homeStore.destroyStoreBindings()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})