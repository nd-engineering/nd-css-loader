var loaderUtils = require('loader-utils')
var miniCSS = require('mini-css')

var classReg = /(\S+)node_modules\/@sdp.nd\/([\w|-]+)\/(widget)-([\w|-]+)\/(\S+)/g
module.exports = function (content) {
  var widgetUrl = loaderUtils.getRemainingRequest(this)
  if (classReg.test(widgetUrl)) {
    var className = widgetUrl.replace(classReg, '$2-$4')
    var result = []
    // 删除无关的字符串
    miniCSS(content).split('}').forEach(text => {
      text && result.push(`.${className} ${text}}`)
    })
    return result.join('')
  } else {
    return content
  }
}
