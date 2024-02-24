// pages/user/login/login.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    loginStatus:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowLoginWindow:true,
    isShowLoginForm:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickHide() {
      console.log(this.properties.loginStatus)
      this.setData({ isShowLoginWindow: !this.properties.loginStatus })
      console.log(this.data.isShowLoginWindow)
    },
    backToHome(){
      wx.switchTab({
        url:'../home/home'
      })
    },
    handleLogin(){
      this.setData({isShowLoginForm:true})
    },
    onClose(){
      this.setData({isShowLoginForm:false})
    }
  }
})