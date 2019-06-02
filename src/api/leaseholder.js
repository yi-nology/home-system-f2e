import request from '../plugin/axios'

export function setLeaseholder (data) {
  return request({
    url: '/leaseholder/setLeaseholder',
    method: 'post',
    data
  })
}

export function updateLeaseholder (data) {
  return request({
    url: '/leaseholder/updateLeaseholder',
    method: 'post',
    data
  })
}

export function getLeaseholderList (data) {
  return request({
    url: '/leaseholder/getList',
    method: 'post',
    data
  })
}

export function getLeaseData (key) {
  return request({
    url: '/leaseholder/getInfo/' + key,
    method: 'post'
  })
}

export function delInfo (data) {
  return request({
    url: '/leaseholder/delInfo/' + data,
    method: 'get'
  })
}
