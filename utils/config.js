const url = "http://localhost:7001"// "http://www.huishenghuo.net:7001"

const accountUrl = url + "/mpUserAccount"
exports.loginUrl=url+"/login"
exports.accountUrl = {
  update: accountUrl + "/update",
  getInfo: url + "/mpUserAccount/getInfo",
  updateInfo: url + "/mpUserAccount/updateInfo",

} //"http://localhost:7001"
exports.cacheUrl = url + "/mpCache"
exports.serviceUrl = url + "/mpUserService" //"http://192.168.0.29:7001/static/miniprogram"
exports.chatUrl = "http://www.huishenghuo.net:3000"//"http://192.168.0.29:3000"
exports.questionUrl = url + "/question"
exports.payUrl = url + "/pay"
//
/*
  
    */