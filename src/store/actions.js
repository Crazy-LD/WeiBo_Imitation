import {
  reqWeiboContents,
  reqFolloweesInfo,
  reqChangeInfo,
  reqChangeZan,
  reqComment,
  reqLoginOut,
  reqDeleteWeiBo
} from '../api/api'
import {
  RECEIVE_WEIBO_CONTENTS,
  RECEIVE_FOLLOWEES,
  RECEIVE_USER_INFO,
  CLEAR_USER_INFO,
  ADD_ONE_WEIBO,
  CHANGE_ZAN,
  RECODE_COMMENT,
  DELETE_WEIBO,
  RECEIVE_CURRENT_WEIBO,
  DELETE_USER
} from './mutation_types'
export default {
  // 得到微博池的内容
  async getWeiboContents ({commit}, bc) {
    let result = await reqWeiboContents()
    if (result.code === 0) {
      commit(RECEIVE_WEIBO_CONTENTS, {weiboContents: result.data})
      bc && bc()
    }
  },
  // 得到关注人的信息
  async getFolloweesInfo ({commit}, bc) {
    let result = await reqFolloweesInfo()
    if (result.code === 0) {
      commit(RECEIVE_FOLLOWEES, {followeesInfos: result.data})
      bc && bc()
    }
  },
  // 记录用户的信息
  recordUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  // 清除用户信息
  async clearUserInfo ({commit}) {
    let result = await reqLoginOut()
    if (result.code === 0) {
      sessionStorage.removeItem('access_token')
      commit(CLEAR_USER_INFO)
    }
  },
  // 修改个人资料
  async changeInfo ({commit}, {name, avatar, userName}) {
    let result = await reqChangeInfo({name, avatar, userName})
    if (result.code === 0) {
      commit(RECEIVE_USER_INFO, {userInfo: result.data})
    }
  },
  // 增加一条微博
  addWeiBoContent ({commit}, weiBoContent) {
    commit(ADD_ONE_WEIBO, {weiBoContent})
  },
  // 改变赞的状态
  async changeZan ({commit}, {weiBoID, isZan}) {
    let result = await reqChangeZan({weiBoID, isZan})
    if (result.code === 0) {
      commit(CHANGE_ZAN, {weiBoID, isZan})
    }
  },
  // 评论
  async comment ({commit}, {content, observed, weiBoID}) {
    let result = await reqComment({content, observed, weiBoID})
    if (result.code === 0) {
      commit(RECODE_COMMENT, {content, observed, weiBoID})
    }
  },
  // 删除微博
  async deleteWeiBo ({commit}, weiBoID) {
    let result = await reqDeleteWeiBo(weiBoID)
    if (result.code === 0) {
      commit(DELETE_WEIBO, weiBoID)
    }
  },
  // 得到当前微博的内容
  getCurrentContents ({commit}, name) {
    commit(RECEIVE_CURRENT_WEIBO, name)
  },
  // 删除当前用户
  deleteUser ({commit}, {userName, name}) {
    commit(DELETE_USER, {userName, name})
  }
}
