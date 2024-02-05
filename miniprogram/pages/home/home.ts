// pages/index.ts
import {login,bindAccountAndLogin} from '@services/user'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    //code只能使用一次，再次使用需要重新获取
    const {code}=await wx.login()
    const res=await login(code)
    console.log(res)
    if(res.code===1008){
      //未注册
      //模拟登录未注册，帐号绑定测试
      const {code}=await wx.login()
      const {token}=await bindAccountAndLogin(code,'2052400186@qq.com','123456')
      console.log(token)
    }
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
  onUnload() {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})