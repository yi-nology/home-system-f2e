import request from '../plugin/axios'

export function getPriceList (data) {
  return request({
    url: '/price/getInfo',
    method: 'post',
    data
  })
}

export function setPrice (data) {
  return request({
    url: '/price/setInfo',
    method: 'post',
    data
  })
}

export function delPrice (data) {
  return request({
    url: '/price/delInfo',
    method: 'post',
    data
  })
}
