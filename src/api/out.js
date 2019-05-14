import request from '../plugin/axios'

export function getOutInfo (data) {
  return request({
    url: '/out/getInfo',
    method: 'post',
    data
  })
}
