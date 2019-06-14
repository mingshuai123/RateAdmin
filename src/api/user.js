import request from '@/utils/request'

var baseURL='http://192.168.1.128:5000/'

export function login(data) {
  return request({
    url: baseURL+'account/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: baseURL+'account/logout',
    method: 'post'
  })
}
