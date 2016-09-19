var loaderUtils = require('loader-utils')

var classReg = /(\S+)node_modules\/@sdp.nd\/([\w|-]+)\/(widget-[\w|-]+)\/(\S+)/g
module.exports = function (content) {
  var widgetUrl = loaderUtils.getRemainingRequest(this)
  if (classReg.test(widgetUrl)) {
    var className = widgetUrl.replace(classReg, '$2-$3')
    return `.${className} { ${content} }`
  } else {
    return content
  }
}
