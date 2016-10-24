var loaderUtils = require('loader-utils')
var css = require('css')
// 不要匹配 page 因为page要控制 HTML BODY
var classReg = /(\S+)node_modules\/@sdp.nd\/([\w|-]+)\/(widget-[\w|-]+)\/(\S+)/g
// 要找出手淘的前缀 [data-dpr="\d"]
var flexibleReg = /^\s*(\[data-dpr\s*=\s*["']\d+["']\])(.+)$/
module.exports = function (content) {
  var widgetUrl = loaderUtils.getRemainingRequest(this)
  if (classReg.test(widgetUrl)) {
    var className = widgetUrl.replace(classReg, '$2-$3')
    var ast = css.parse(content) // .stylesheet.rules[0].selectors.join('|')
    try {
      ast.stylesheet && ast.stylesheet.rules && ast.stylesheet.rules.forEach(rule => {
        rule.selectors && rule.selectors.forEach((selector, i) => {
          var selectorMatch = selector.match(flexibleReg)
          if (selectorMatch && selectorMatch.length === 3) {
            rule.selectors[i] = `${selectorMatch[1]} .${className} ${selectorMatch[2]}` // [data-dpr="\d"] .className .selector
          } else {
            rule.selectors[i] = `.${className} ${selector}`
          }
        })
      })
    } catch (e) {
      console.log('nd-css-loader 解析异常')
      console.log(e)
    }
    // console.log(css.stringify(ast))
    return css.stringify(ast)
  } else {
    return content
  }
}
