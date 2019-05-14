import request from '../plugin/axios'

export function getHouseList (data) {
  return request({
    url: '/house/getInfo',
    method: 'post',
    data
  })
}

export function setHouse (data) {
  return request({
    url: '/house/setInfo',
    method: 'post',
    data
  })
}

export function delHouse (data) {
  return request({
    url: '/house/delInfo',
    method: 'post',
    data
  })
}
