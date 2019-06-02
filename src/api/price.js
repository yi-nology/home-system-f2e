import request from '../plugin/axios'

export function getPriceList (data) {
  return request({
    url: '/homePrice/getInfo',
    method: 'post',
    data
  })
}

export function setPrice (data) {
  return request({
    url: '/homePrice/saveOrUpdatePrice',
    method: 'post',
    data
  })
}

export function delPrice (data) {
  return request({
    url: '/homePrice/delInfo/' + data,
    method: 'get'
  })
}

export function getDetail (data) {
  return request({
    url: '/homePrice/getDetail',
    method: 'post',
    data
  })
}
