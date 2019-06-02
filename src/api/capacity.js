
import request from '../plugin/axios'

export function createToken (data) {
  return request({
    url: '/capacity/createToken/' + data,
    method: 'get'
  })
}

export function getInfo (data) {
  return request({
    url: '/capacity/getAuthenticateByToken/' + data,
    method: 'post'
  })
}

export function getInfoById (data) {
  return request({
    url: '/capacity/getAuthenticateInfo/' + data,
    method: 'get'
  })
}

export function getIdInfo (data) {
  return request({
    url: '/capacity/getIdInfo',
    method: 'post',
    data
  })
}

export function setInfo (data) {
  return request({
    url: '/capacity/setInfo',
    method: 'post',
    data
  })
}
