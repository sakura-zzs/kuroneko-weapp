// components/navigation-bar.ts
Component({

  /**
   * 组件的属性列表
   */
  options:{
    // 开启多插槽
  multipleSlots:true
  },
  properties: {
    title:{
      type:String,
      value:"默认标题"
    },
    back:{
      type:Boolean,
      value:false
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

  }
})