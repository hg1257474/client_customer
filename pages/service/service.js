// pages/service/service.js
const io = require("../../utils/weapp.socket.io.js")
const {
  serviceUrl
} = require("../../utils/config.js")
let socket = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isNoServices: false,
    services: []
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this
    const {
      services
    } = that.data
    socket = io(serviceUrl, {
      query: {
        sessionId: wx.getStorageSync("sessionId").value
      }
    })
    console.log(1)
    socket.emit("pull", (_res) => {
      console.log(_res)
      if (!_res.length) this.setData({
        isNoServices: true
      })
      const services = _res.map(item => {
        const date = new Date(item[1])
        item[1] = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`
        return item
      })

      that.setData({
        services
      })
      socket.on("push", (service, cb) => {
        service[1] = new Date(service[1])
        service[1] = `${service[1].getFullYear()}.${service[1].getMonth()}.${service[1].getDate()}`
        let index = that.data.services.findIndex(item => item[3] === service[3])
        if (index !== -1) that.data.services.splice(index, 1)
        that.data.services.unshift(service)
        that.setData({
          services: that.data.services
        })
        if (cb) cb()
      })
    })

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onSubmit(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/chat/chat?chatId=${e.detail.target.id}&formId=${e.detail.formId}`
    })
    console.log(e.detail)
  },
})

// will implement batch pull in the future