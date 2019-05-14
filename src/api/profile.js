import request from '../plugin/axios'

export function getProfile (data) {
  return request({
    url: '/profile/getInfo',
    method: 'post',
    data
  })
}

export function setProfile (data) {
  return request({
    url: '/profile/setInfo',
    method: 'post',
    data
  })
}
