import request from '../plugin/axios'

export function setContract (data) {
  return request({
    url: '/contract/saveOrUpdate',
    method: 'post',
    data
  })
}

export function getContractList (data) {
  return request({
    url: '/contract/getInfo',
    method: 'post',
    data
  })
}
