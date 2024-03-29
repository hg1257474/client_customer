//index.js
const {
  categories,
  servicesGroup
} = require('./other')
const {
  url,
  cacheUrl
} = require("../../utils/config.js")
const {
  myGetStorage
} = require('../../utils/storage.js')
// console.log(getApp())
Page({
  data: {
    modal: {
      category: null,
      service: null,
      show: false
    },
    category: 0,
    categories: undefined,
    servicesGroup: undefined

  },
  onShow() {
    console.log(wx.getStorageSync("sessionId"))
    const {
      globalData
    } = getApp()
    let flag = true
    if (globalData.index && globalData.index.shouldCompleteInfo) {
      flag = false;
      globalData.index = { ...globalData.index,
        shouldCompleteInfo: false
      }
    }
    if (flag && this.data.modal.show) this.setData({
      modal: {
        category: null,
        service: null,
        show: false
      }
    })
  },
  onReady() {
    const that = this
    const indexPage = wx.getStorageSync("indexPage") || {
      timestamp: null
    }
    wx.request({
      url: cacheUrl,
      data: {
        type: "indexPage",
        timestamp: indexPage.timestamp
      },
      success: function(res) {
        console.log(res)
        if (res.data) wx.setStorageSync("indexPage", res.data)
        that.setData(wx.getStorageSync("indexPage"))
      }
    })
  },
  ontap() {
    const query = wx.createSelectorQuery()
    const nodes = query.selectAll(".services-name")
    nodes.boundingClientRect(function(rect) {
      // console.log(rect)
      rect.id // 节点的ID
      rect.dataset // 节点的dataset
      rect.left // 节点的左边界坐标
      rect.right // 节点的右边界坐标
      rect.top // 节点的上边界坐标
      rect.bottom // 节点的下边界坐标
      rect.width // 节点的宽度
      rect.height // 节点的高度
      wx.pageScrollTo({
        scrollTop: rect[2].top,
        duration: 300
      })
    }).exec()

  },

  onChoose: function({
    currentTarget: {
      dataset: {
        category,
        service
      }
    }
  }) {
    // console.log(service, category)
    this.setData({
      modal: {
        service,
        category,
        show: true,
        icon: servicesGroup[category][2][service][0],
        name: servicesGroup[category][2][service][1],
        content: servicesGroup[category][2][service][3]
      }
    }, function() {
      // console.log(this.data)
    })
  },
  onPageScroll(e) {
    let that = this
    const query = wx.createSelectorQuery()
    const nodes = query.selectAll(".services-name")
    nodes.boundingClientRect(function(rect) {

      rect.some((value, index) => {
        if (value.top > 0) {
          // console.log(rect)
          if (index !== that.data.category) that.setData({
            category: index
          })
          return true
        }
      })
    }).exec()
  },

  onCategoryTap: function({
    currentTarget: {
      dataset: {
        id
      }
    }
  }) {
    // console.log(id)
    this.setData({
      category: id
    })
    const query = wx.createSelectorQuery()
    const nodes = query.selectAll(".services-name")
    nodes.boundingClientRect(function(rect) {
      wx.pageScrollTo({
        scrollTop: rect[id].top,
        duration: 300
      })
    }).exec()

  },
  onClose: function(e) {
    // console.log("close")
    this.setData({
      "modal.show": false,
      "modal.service": null
    })
  },
  onContract: function(e) {
    // console.log("contract")
    wx.navigateTo({
      url: `/pages/question/question?category=${this.data.modal.category}&name=${this.data.modal.service}&type=1`
    })
  },
  onCommunication: function(e) {
    // console.log(getApp())
    const that=this
    console.log(wx.getStorageSync("customer"))
    if (wx.getStorageSync("customer").isAllInfo) {
      if (wx.getStorageSync("customer").vip.kind !== "普通" || wx.getStorageSync("fake")) wx.navigateTo({
        url: `/pages/question/question?category=${this.data.modal.category}&name=${this.data.modal.service}&type=0`
      })
      else wx.showModal({
        title: '您不是会员',
        content: '请你在充值会员后再进行此操作',
        confirmText: '充值',
        confirmColor: 'green',
        cancelText: '取消',
        cancelColor: 'gray',
        success(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            let index = getApp().globalData.index || {}
            getApp().globalData.index = {
              ...index,
              callback: () => {
                wx.navigateTo({
                  url: `/pages/question/question?category=${that.data.modal.category}&name=${that.data.modal.service}&type=0`
                })
              }
            }
            wx.navigateTo({
              url: `/pages/pay/pay`
            })
          }
        }
      })

    } else {
      wx.showToast({
        title: '请您先完善身份信息',
        icon: "none"
      })
      setTimeout(() => {
        const {
          globalData
        } = getApp()
        globalData.index = {
          ...globalData.index,
          shouldCompleteInfo: true
        }
        wx.switchTab({
          url: '/pages/user/user',
        })
      }, 1500)
    }
  }
})