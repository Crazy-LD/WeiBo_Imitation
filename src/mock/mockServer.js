import data from './data'
import Mock from 'mockjs'
Mock.mock('/getweibos', {code: 0, data: data.weiboContent}) // 得到微博的内容
Mock.mock('/getfollowees', {code: 0, data: data.followeesInfos}) // 得到关注人的信息
