// pages/publish/publish.ts
import {createStoreBindings}from 'mobx-miniprogram-bindings'
import homeStore from'@store/useHome'
import {getEditorContents,uploadImage} from '@utils/util'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import {createMoment,imagesBindToMoment,labelsBindToMoment} from '@services/publish'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelList:[],
    //发布标题
    title:'',
    //控制弹出分类选择窗口
    isShowPopup:false,
    //已选择标签
    labelSelected:'',
    //分类选择数据源
    labelSelectMenu:[
      {
        // 导航名称
        text: '标签',
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '温州',
            // id，作为匹配选中状态的标识
            id: 1
          },
          {
            text: '杭州',
            id: 2,
          },
        ],
      },
    ],
    //选中项id，为数组时支持多选
    selectedId:[],
    //最大选中数
    maxSelectedCount:5    
  },
  async publishing(){
    let {title,labelSelected}=this.data
    const labelList=labelSelected.split(',')
    title=title.trim()
    if(!title.length)
    return Toast.fail('请输入标题！')
    if(title.length>30)
      return Toast.fail('标题长度不能超过30！')
    const myEditor= this.selectComponent('.my-editor')
    const {text,delta}=await getEditorContents(myEditor)
    console.log(text,delta)
    if(text.length<20)
    return Toast.fail('内容不能少于20字！')
    if(!labelList.length)
    return Toast.fail('请至少选择1个标签！')
    if(labelList.length>5)
    return Toast.fail('最多只能选择5个标签！')
    //获取编辑器内容中所有的临时图片路径进行上传
    const tempFilePaths:Array<any>=[]
    delta.ops.forEach(e=>{
      if(e.attributes&&e.insert.image)
       tempFilePaths.push(uploadImage(e.insert.image))
    })
    let realFilePaths:Array<{url:String,id:Number}>=[]
    if(tempFilePaths.length){
    const temp=await Promise.all(tempFilePaths)
    realFilePaths=temp.map(v=>v.imgLinks)
    //将临时路径替换为远程地址
    let index=0
    delta.ops.forEach(e=>{
      if(e.attributes&&e.insert.image){
        e.insert.image=realFilePaths[index++].url
      }
    })
    myEditor.setContents({delta})
    }
    //上传动态
    const {html}=await getEditorContents(myEditor)
    const momentId=await createMoment(title,html)
    //绑定动态图片
    if(realFilePaths.length)
    await imagesBindToMoment(realFilePaths,momentId)
    //绑定动态标签
    await labelsBindToMoment(labelList,momentId)
    //wx.reLaunch会关闭所有页面，打开一个页面，这个页面会重新加载，实现数据实时更新
    wx.reLaunch({url:'../home/home?published=true'})
  },
  handleShowPopup(){
    this.setData({
      isShowPopup:true
    })
  },
  //点击子项时，添加/删除子项id
  onClickItem({ detail={} }) {
    const { selectedId } = this.data;

    const index = selectedId.indexOf(detail.id);
    if (index > -1) {
      selectedId.splice(index, 1);
    } else {
      selectedId.push(detail.id);
    }

    this.setData({ selectedId });
  },
  //隐藏popup
  onClose(){
    this.setData({isShowPopup:false})
    const labelList=this.data.labelList
    const selectedId= this.data.selectedId
    const labelSelected:Array<string>=[]
    selectedId.forEach(id=>{
      let item= labelList.find(i=>i.id===id)
      labelSelected.push(item?.name)
    })
    this.setData({labelSelected:labelSelected.join(',')})
  },
  //提取分类选择数据源
  getLabelSelectSource(){
    const labelList=this.data.labelList.slice(1)
    const labelSelectSource=labelList.map(e=>({text:e.name,id:e.id}))
    this.setData({labelSelectMenu:[{
      // 导航名称
      text: '标签',
      // 该导航下所有的可选项
      children:labelSelectSource
    }]
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.homeStore=createStoreBindings(this,{
      store:homeStore,
      fields:['labelList'],
      actions:[]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getLabelSelectSource()
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