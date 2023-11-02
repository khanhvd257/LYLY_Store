import request, { Method } from "@/api/axios"

export function createCategory(data) {
  return request({
    url: '/category',
    headers: { 'Content-Type': 'application/json' },
    method: Method.POST,
    needToken: true,
    data: data,
  })
}
