import request, { Method } from "@/api/axios"


export function login(param) {
  return request({
    url: '/login',
    headers: { 'Content-Type': 'application/json' },
    method: Method.POST,
    data: param,
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: Method.POST,
    needToken: true,
  })
}

export function uploadFile(param) {
  return request({
    url: '/upload',
    headers: { 'Content-Type': 'multipart/form-data' },
    method: Method.POST,
    needToken: true,
    data: param,
  })
}
