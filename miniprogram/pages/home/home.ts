// pages/index.ts
import {checkLogin,getUserInfo,login} from '@services/user'
import {createStoreBindings}from 'mobx-miniprogram-bindings'
import homeStore from'@store/useHome'
import {getLabelList, getMomentList}from '@services/home'
import { watch}from '@utils/util'
import _ from 'loadsh'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:"",
    labelList:[],
    momentList:[],
    labelMoment:[],
    //加载更多
    loadMoreMoment:[],
    //触底加载数
    loadCount:5,
    //是否显示下拉加载图标
    isLoading:true,
    loginStatus:false,
    active:0,
    //是否显示加载骨架屏
    isLabelListLoaded:true,
    //是否显示占位图
    isShowEmpty:false,
    isShowBackTop:false,
    userInfo:{}
  },
  async getLabel(this:any){
    const res=await getLabelList()
    res.unshift({id:0,name:'All'})
    this.setLabelList(res)
  },
  async getMoment(){
    const res=await getMomentList()
    this.setMomentList(res)
    this.setData({labelMoment:res,isLabelListLoaded:false})
  },
  async getUserProfile(id:Number){
    const res=await getUserInfo(id)
    this.setUserInfo(res)
  },
  //检测登录状态,尝试默认登录
  async getLoginStatus(){
    const loginStatus=await checkLogin()
    //token不存在或已过期
    if(!loginStatus){
    // code只能使用一次，再次使用需要重新获取
    const {code}=await wx.login()
    // login用于用户进入小程序的默认登录行为，只有用户进行了登录行为绑定过才会直接登录，否则会返回错误
    const res=await login(code)
    if(res.code===1008){
      //当前微信用户没有进行帐号绑定
      this.setLoginStatus(loginStatus)
    }
    if(res.token){
      //当前微信用户绑定过帐号，保存token
      wx.setStorageSync('token',res.token)
      this.setLoginStatus(true)
      //获取用户信息
      await this.getUserProfile(res.user.userId)
    }
    }else{
      this.setLoginStatus(loginStatus)
    }
  },
  getLabelMoment(labelName:string){
    if(this.data.isShowEmpty)
    this.setData({isShowEmpty:false})
    const labelMomentLen=this.setLabelMoment(labelName)
    if(!labelMomentLen){
    this.setData({isShowEmpty:true})
    }
  },
  loadMore(){
    const {loadMoreMoment,labelMoment,loadCount}=this.data
    const start=loadMoreMoment.length
    //没有更多数据
    if(start>=labelMoment.length) return
    const count=start?start+loadCount:loadCount
    const pushList=labelMoment.slice(start,count)
    this.setData({loadMoreMoment:[...loadMoreMoment,...pushList]})
  },
  goToLogin(){
    wx.switchTab({url:'../user/user'})
  },
  searching(e){
    let labelName=e.detail
    if(!labelName||!labelName.length) return Toast.fail({message:'请输入合法关键词~',selector: '#home-toast'})
    labelName=labelName.trim()
    let labelList:Array<any>=this.data.labelList.slice(1)
    labelList=labelList.map(e=>e.name+e.icon)
    if(JSON.stringify(labelList).indexOf(labelName)===-1){
      return Toast.fail({message:'当前关键词还没收录哦~',selector: '#home-toast'})
    }
    const app=getApp()
    app.globalData.momentList=this.data.momentList
    wx.navigateTo({url:`../search/search?title=${labelName}`})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(option:Record<string, string | undefined>) {
    //由发布页跳转而来，发布成功
    if(option.published) {
      Toast.success({message:'发布成功！',selector: '#home-toast'})
    }
    //监听labelMoment的变化，同步到loadMoreMoment
    watch(this,this.data,'labelMoment',(newVal,oldVal)=>{
      this.setData({loadMoreMoment:[]})
      if(newVal.length){
      setTimeout(()=>{
        this.loadMore()
      },500)
      }
    },true)
    //获取标签数据
    //使用createStoreBindings将store数据映射到页面实例中
    this.homeStore=createStoreBindings(this,{
      store:homeStore,
      fields:['labelList','momentList','labelMoment','loginStatus','userInfo'],
      actions:['setLabelList','setMomentList','setLabelMoment','setLoginStatus','setUserInfo']
    })
    await this.getLoginStatus()
    await this.getLabel()
    await this.getMoment()
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
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  //使用节流函数对频繁触发的页面滚动事件优化
  onPageScroll:_.throttle(function(e:{scrollTop:Number}){
    if(e.scrollTop>=800&&!this.data.isShowBackTop){
      this.setData({isShowBackTop:true})
    }
    if(e.scrollTop<800){
      this.setData({isShowBackTop:false})
    }
  },500)
})