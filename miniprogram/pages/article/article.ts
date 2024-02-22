// pages/article/article.ts
import {createStoreBindings}from 'mobx-miniprogram-bindings'
import homeStore from'@store/useHome'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    momentData:{},
    richTextHtml:"",
    editorContent: '' // 用于存储编辑器的内容
  },
  getMomentDetail(this:any,id:number){
    this.setMomentData(id)
  },
  handleRenderRichText(this:any){
    // const editor = createEditor()
    // const html = editor.getHtml()
    // this.setData({richTextHtml:html})
    // console.log(this.data.momentData.id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(this:any,query: Record<string, string >) {
    this.homeStore=createStoreBindings(this,{
      store:homeStore,
      fields:['momentData'],
      actions:['setMomentData']
    })
    this.getMomentDetail(parseInt(query.id))
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
    this.handleRenderRichText()
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