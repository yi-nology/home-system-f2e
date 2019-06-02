import request from '../plugin/axios'

export function getOutData (data) {
  return request({
    url: '/search/getInfo',
    method: 'post',
    data
  })
}
