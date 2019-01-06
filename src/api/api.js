/* 接口请求模块 */
import ajax from './ajax'
const BASE_URL = '/api'

// export const reqWeiboContents = () => ajax(`/getweibos`) // 请求所有微博的内容
export const reqWeiboContents = () => ajax(`${BASE_URL}/getweibos?time=${Date.now()}`) // 请求所有微博的内容

// export const reqFolloweesInfo = () => ajax('/getfollowees') // 请求所有人的信息
export const reqFolloweesInfo = () => ajax(`${BASE_URL}/getfollowees?time=${Date.now()}`) // 请求所有人的信息

export const reqLoginPwd = ({userName, pwd, isManager, captcha}) => ajax(`${BASE_URL}/login_pwd`, {userName, pwd, isManager, captcha}, 'POST') // 请求用户登录

export const reqLoginOut = () => ajax(`${BASE_URL}/login_out`) // 请求退出登录

export const reqChangeInfo = ({name, avatar, userName}) => ajax(`${BASE_URL}/changeInfo`, {name, avatar, userName}, 'POST') // 请求编辑个人资料

export const reqSendWeiBo = weiBoText => ajax(`${BASE_URL}/sendWeiBo`, {weiBoText}, 'POST') // 请求发送微博

export const reqInitUser = () => ajax(`${BASE_URL}/init_userinfo`) // 请求缓存的用户

export const reqChangeZan = ({weiBoID, isZan}) => ajax(`${BASE_URL}/change_zan`, {weiBoID, isZan}, 'POST') // 请求处理点赞

export const reqComment = ({content, observed, weiBoID}) => ajax(`${BASE_URL}/comment_weibo`, {content, observed, weiBoID}, 'POST') // 请求评论微博
export const reqChangePwd = ({pwd, captcha}) => ajax(`${BASE_URL}/change_pwd`, {pwd, captcha}, 'POST') // 请求修改密码

export const reqDeleteUser = (userName) => ajax(`${BASE_URL}/delete_user`, {userName}, 'POST') // 请求注销用户

export const reqDeleteWeiBo = (weiBoID) => ajax(`${BASE_URL}/delete_weibo`, {weiBoID}, 'POST') // 请求删除微博
