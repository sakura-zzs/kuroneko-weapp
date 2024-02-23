// components/kk-editor/kk-editor.ts
Component({

  /**
   * 组件的属性列表
   */
  options:{
    styleIsolation: 'shared'
  },
  properties: {
    //编辑器高度
    editorHeight:{
      type:String,
      value:'200'
    },
    //编辑器提示内容
    placeholder:{
      type:String,
      value:"请输入内容..."
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //当前启用工具项
    formats:{},
    //键盘高度，工具栏距键盘下方高度（工具栏bottom值）
    keyboardHeight:0,
    isShowToolBar:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化editor
    onEditorReady(){
      //直接将this给that，就能获取到this的类型
      let that=this
      // 初始化一个实例
      this.createSelectorQuery().select('#editor').context(res=>{
        //保存编辑器实例，之后就可以通过这个编辑器实例调用编辑器api了
        that.kkEditor=res.context
      }).exec()
    },
    onInput(e:WechatMiniprogram.EditorInput){
      //获取输入内容
      console.log(e.detail.delta.ops)
      console.log("html",e.detail.html)
      const ops=e.detail.delta.ops
      ops.forEach(e=>{
        if(e.attributes&&e.insert)
        e.insert.image='http://localhost:8001/1698588507805.png'
      })
      this.kkEditor.setContents({delta:ops})
      this.kkEditor.getContents({
        success:res=>{
          console.log(res.html)
        }
      })
    },
    onBlur(e:WechatMiniprogram.EditorBlur){
      //编辑器失去焦点，收起键盘  
      this.kkEditor.blur()
      this.setData({isShowToolBar:false})
    },
    //编辑器获取焦点后显示工具栏
    onFocus(){
      this.setData({isShowToolBar:true})
    },
    // 工具栏配置流程
    //view.toolBar:工具栏容器，通过catchtouchend绑定点击事件不会使编辑器失去焦点
    //在toolBar中定义好工具项i标签，为i标签配置指定的class（这些class可以在官方的editor组件页面下方获取代码片段editor->assets/iconfont.wxss）
    //通过为i标签设置自定义属性data-name来区分工具项的功能（像h系列的加粗标签，可以额外设置data-value来区分是h几标签的加粗效果）
    //利用事件委托，点击工具项i的点击事件委托给了父元素toolBar
    //通过事件对象e.target.dataset获取到触发事件元素的自定义属性获取到了当前要使用的工具项（要添加的样式）
    //再通过编辑器实例下的format方法根据工具项的name和value改变样式
    //工具项i能绑定的有效name和value（能被format方法识别）参考https://developers.weixin.qq.com/miniprogram/dev/api/media/editor/EditorContext.format.html

    onStatusChange(e:WechatMiniprogram.EditorStatusChange){
      //在调用了editor实例的format方法改变编辑器内容的样式后触发，返回选区已设置的样式，在e.detail中
      //e.detail中就是当前启用的工具项的name值
      //可以利用它来确定已经添加的样式，或者确定当前启用了的工具项，
      //通过e.detail就能知道当前启用了哪些工具项，从而通过动态添加class让工具项高亮
      const formats=e.detail
      this.setData({formats})
    },
    format(e:WechatMiniprogram.EditorStatusChange){
      //监听工具栏点击，保存工具项添加的样式
      const name=e.target.dataset.name
      const value=e.target.dataset.value
      this.kkEditor.format(name,value)
    },
    //图片上传
    insertImage(){
      var that=this
      wx.chooseMedia({
        //最多可选择文件数
        count:9,
        //文件类型
        mediaType:['image'],
        //图片来源，album：从相册选择，camera：现拍
        sourceType:['album', 'camera'],
        success(res){
          //res包含tempFiles本地临时文件列表和type文件类型
          //tempFilePath本地文件临时路径，
          console.log(res)
          let url=res.tempFiles[0].tempFilePath
          //点击发布后，获取editor的delta格式（json格式），获取其中所有的image临时路径，通过wx.uploadFile依次进行上传
          //获取服务器返回的图片地址
          //再通过editor的getContents获取editor的delta格式，将其中的insert:{image:url}中的临时路径替换为远程地址
          //再通过editor的setContents将更新的delta数据保存
          //最后通过editor的getContents获取editor的html格式保存至数据库
            that.kkEditor.insertImage({
              src:url,
              //添加到图片img标签的类名
              extClass:"editor-image",
              alt:"图片加载错误",
              //图片宽高
              height:"130rpx"
            })
        }
      })  
    },
    //插入分割线
    addDivider(){
      this.kkEditor.insertDivider()
    }
  },
  created(){
    //工具栏适配键盘
    //获取编辑器获取焦点弹出的键盘高度
    //将这个高度作为toolBar的bottom值，这样工具栏就会紧贴键盘上方
    //监听键盘高度变化
    wx.onKeyboardHeightChange(res=>{
      this.setData({
        keyboardHeight:res.height
      })
    })
  }
})