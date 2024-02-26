// components/back-top/back-top.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    selector:{
      type:String,
      value:'.bar'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    backTop(){
      wx.pageScrollTo({selector:this.properties.selector})
    }
  }
})