export default {
  getCode(code) {
    var locations = location + ""
    console.log(locations,44)
    // if (locations.indexOf('/?#/') > 0) {//处理在支付页面授权时，获取code失败
    // 	locations = locations.replace('/?#/', '/#/')
    // }
    if (locations.indexOf("?") == -1) {
      return "";
    }
    var params = locations.split("?");
    var queryArr = params[1].split("&");
    var queryMap = {};
    for (var index in queryArr) {
      var k = queryArr[index].split("=")[0];
      var v = queryArr[index].split("=")[1];
      queryMap[k] = v;
    }
    return queryMap[code];
  },
  weixinauth() {
    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8cba2f85ea47c6a6&redirect_uri=http%3a%2f%2fimis.biaodaa.com%2f%23%2findex&response_type=code&scope=snsapi_base&state=CD-IMIS#wechat_redirect'
  },
}