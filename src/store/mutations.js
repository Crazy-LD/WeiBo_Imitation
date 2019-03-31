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
  [RECEIVE_WEIBO_CONTENTS] (state, {weiboContents}) {
    state.weiboContents = weiboContents
    for (let i = 0; i < state.weiboContents.length; i++) {
      state.followeesInfos.forEach(value => {
        if (value.userName === state.weiboContents[i].observer) {
          state.weiboContents[i].observer = value.name
        }
        if (state.weiboContents[i].observed && value.userName === state.weiboContents[i].observed) {
          state.weiboContents[i].observed = value.name
        }
      })
    }
  },
  [RECEIVE_FOLLOWEES] (state, {followeesInfos}) {
    state.followeesInfos = followeesInfos
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [CLEAR_USER_INFO] (state) {
    state.userInfo = ''
  },
  [ADD_ONE_WEIBO] (state, {weiBoContent}) {
    // const {weiboContents, followeesInfos} = state
    const {weiboContents} = state
    // const {name, avatar} = state.userInfo
    weiboContents.unshift(weiBoContent)
    // let hasUser = followeesInfos.forEach((value, index) => {
    //   if (value.name === weiBoContent.name) {
    //     return true
    //   }
    //   if (index === followeesInfos.length - 1) {
    //     return false
    //   }
    // })
    // if (!hasUser) {
    //   followeesInfos.push({
    //     name,
    //     avatar
    //   })
    // }
  },
  [CHANGE_ZAN] (state, {weiBoID, isZan}) {
    state.weiboContents.forEach((value, index) => {
      let name = state.userInfo.name
      if (value.weiBoID === weiBoID) {
        let thumbUps = value.thumb_up_peoples
        if (isZan) {
          thumbUps.splice(thumbUps.indexOf(name), 1)
        } else {
          thumbUps.unshift(name)
        }
      }
    })
  },
  [RECODE_COMMENT] (state, {content, observed, weiBoID}) {
    const {weiboContents, userInfo} = state
    let weiBoContent = weiboContents.find(value => {
      return value.weiBoID === weiBoID
    })
    let observer = userInfo.name
    let data = {
      observedName: observed,
      content,
      observerName: observer
    }
    weiBoContent.weiBoComments.push(data)
  },
  [DELETE_WEIBO] (state, weiBoID) {
    const {weiboContents, currentContents} = state
    let weiBoContent = weiboContents.find(weiboContent => {
      return weiboContent.weiBoID === weiBoID
    })
    weiboContents.splice(weiboContents.indexOf(weiBoContent), 1)
    if (currentContents.length === 0) {
      state.currentContents = weiboContents
    }
  },
  [RECEIVE_CURRENT_WEIBO] (state, name) {
    state.currentContents = state.weiboContents.filter(weiboContent => {
      return weiboContent.name === name
    })
    if (state.currentContents.length === 0) {
      state.currentContents = state.weiboContents
    }
  },
  [DELETE_USER] (state, {userName, name}) {
    state.currentContents = state.currentContents.filter(weiBo => {
      weiBo.thumb_up_peoples = weiBo.thumb_up_peoples.filter(user => {
        return user !== name
      })
      weiBo.weiBoComments = weiBo.weiBoComments.filter(comment => {
        return comment.observedName !== name && comment.observerName !== name
      })
      return weiBo.userName !== userName
    })
    state.followeesInfos = state.followeesInfos.filter(user => {
      return user.userName !== userName
    })
  }
}
