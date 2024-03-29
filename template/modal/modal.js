// template/modal/modal.js
Component({

  behaviors: [],

  // 属性定义（详情参见下文）
  properties: {
    icon: { // 属性名
      type: String,
      value: ''
    },
    name: String, // 简化的定义方式,
    content: String
  },

  data: {}, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() {},
    moved() {},
    detached() {},
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached() {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready() {},

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {},
    hide() {},
    resize() {},
  },

  methods: {
    onMyButtonTap() {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod() {
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      })
    },
    _propertyChange(newVal, oldVal) {

    },
    onClose() {
      console.log(1)
      this.triggerEvent('close')
    },
    onCommunication() {
      this.triggerEvent('communication')

    },
    onContract() {
      this.triggerEvent('contract')
    }
  }

})