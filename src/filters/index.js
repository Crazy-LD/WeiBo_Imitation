// import Vue from 'vue'
// import format from 'date-fns/format'
// Vue.filter('formatTime', function (value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
//   return format(value, formatStr)
// })
import Vue from 'vue'
// import moment from 'moment'
/* 打包分析优化 */
import format from 'date-fns/format'
Vue.filter('moment', function (value, formatStr = ' YYYY-MM-DD HH:mm:ss ') {
  // return moment(value).format(formatStr)
  let time = parseInt(value)
  return format(time, formatStr)
})
