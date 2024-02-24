// pages/publish/publish.ts
import {createStoreBindings}from 'mobx-miniprogram-bindings'
import homeStore from'@store/useHome'
import {getEditorContents,uploadImage} from '@utils/util'
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
    const myEditor= this.selectComponent('.my-editor')
    const {html,text,delta}=await getEditorContents(myEditor)
    console.log(html,text,delta)
    //获取编辑器内容中所有的临时图片路径进行上传
    const tempFilePaths:Array<any>=[]
    delta.ops.forEach(e=>{
      if(e.attributes&&e.insert.image)
       tempFilePaths.push(uploadImage(e.insert.image))
    })
    console.log(tempFilePaths)
    const realFilePaths=await Promise.all(tempFilePaths)
    console.log(realFilePaths)
    console.log(this.data)
    wx.switchTab({url:'../home/home'})
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
    const labelList=this.data.labelList
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