import request from '../plugin/axios'

export function getHomeList (data) {
  return request({
    url: '/home/getInfo',
    method: 'post',
    data
  })
}

export function setHome (data) {
  return request({
    url: '/home/setInfo',
    method: 'post',
    data
  })
}

export function delHome (data) {
  return request({
    url: '/home/delInfo',
    method: 'post',
    data
  })
}
