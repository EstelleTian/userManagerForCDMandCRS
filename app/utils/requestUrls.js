//测试地址
const host = "http://192.168.217.233:8580/atmm-atmb-uuma-server"
//新疆生产地址
// const host = "http://10.27.10.16:18080/uuma-server"
//西南生产地址
// const host = "http://175.17.200.52:18080/uuma-server"

export const getUserListUrl = host + "/online/list"
export const sendLogoutUrl = host + "/online/del"
export const sendRefreshUrl = host + "/online/ref"
export const getUserByTokenUrl = host + "/online/user-bytoken"