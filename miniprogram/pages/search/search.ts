// pages/search/search.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    labelMoment:<any>[],
    isShowEmpty:false
  },
  goToArticleDetail(e:WechatMiniprogram.BaseEvent){
    // 小程序的事件处理函数传参需要通过data-传递
    wx.navigateTo({
      url:e.currentTarget.dataset.path,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option:Record<string, string>) {
    if(option.title){
      const {momentList}=getApp().globalData
      let temList:Array<any>=[]
      momentList.forEach(e => {
        const labels=e?.labelList.map(v=>v.name+v.icon)
      if(JSON.stringify(labels).indexOf(option.title)!==-1){
        temList.push(e)
      }
    })
    if(!temList.length) this.setData({isShowEmpty:true})
      this.setData({title:option.title,labelMoment:[...temList]})
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