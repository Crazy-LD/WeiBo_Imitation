/*
ajax函数请求
*/
import axios from 'axios'
export default function (url = '', data = {}, type = 'GET') {
  // 通过这样的方式，可以直接得到想要的结果
  return new Promise(function (resolve, reject) {
    let promise
    if (type === 'GET') {
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr = dataStr + key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }
    promise.then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
