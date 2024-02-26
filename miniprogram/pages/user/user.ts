// pages/user/user.ts
import {createStoreBindings}from 'mobx-miniprogram-bindings'
import homeStore from'@store/useHome'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginStatus:false
  },
  publishing(){
    if(this.data.loginStatus)
    wx.navigateTo({url:'../publish/publish'})
  },
  logout(){
    //清除token
    wx.removeStorageSync('token')
    //修改登录状态
    this.setLoginStatus(false)
    Toast.fail('退出登录!')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(this:any) {
    this.homeStore=createStoreBindings(this,{
      store:homeStore,
      fields:['loginStatus'],
      actions:['setLoginStatus']
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