// pages/user/login/login.ts
import {bindAccountAndLogin} from '@services/user'
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
import {createStoreBindings}from 'mobx-miniprogram-bindings'
import homeStore from'@store/useHome'
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
  observers:{
    loginStatus:function (newVal,oldVal){
      this.setData({isShowLoginWindow:!newVal})
    }
  },
  data: {
    isShowLoginWindow:true,
    isShowLoginForm:false,
    email:'',
    pwd:'',
    loginStatus:false
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
    },
    async submit(){
      if(!this.validateEmail()&&!this.validatePass()) return Toast.fail('请检查邮箱和密码!')
      //验证邮箱和密码格式
      const {email,pwd}=this.data
      //未注册
      //登录未注册，帐号绑定
      const {code}=await wx.login()
      const res=await bindAccountAndLogin(code,email,pwd)
      if(res.code==1004)
      return Toast.fail('用户不存在，请前往官网注册帐号!')
      if(res.token)
      wx.setStorageSync('token',res.token)
      this.setLoginStatus(true)
      wx.switchTab({url:'/user'})
      return Toast.success('登录成功!')
    },
    validateEmail():Boolean{
      const emailReg = /^[0-9a-zA-Z_-]+@[0-9a-zA-Z_-]+(.[0-9a-zA-Z_-]+)+$/
      const {email}=this.data
      const emailIsTrue=emailReg.test(email)
      if (!emailIsTrue) {
        Toast.fail('请检查邮箱输入！')
        return false
      }
      return true
    },
    validatePass():Boolean{
      const {pwd}=this.data
      const pwdReg = /^[0-9a-zA-Z]{6,16}$/
      const pwdIsTrue = pwdReg.test(pwd)
      if (!pwdIsTrue) {
        Toast.fail('请检查密码输入！')
        return false
      }
      return true
    }
  },
  created(){
    this.homeStore=createStoreBindings(this,{
      store:homeStore,
      fields:['loginStatus'],
      actions:['setLoginStatus']
    })
  }
})