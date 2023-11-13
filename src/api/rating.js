import request, { Method } from "@/api/axios"

export function layDSDanhGia() {
  return request({
    url: '/rating',
    headers: { 'Content-Type': 'application/json' },
    method: Method.GET,
    needToken: true,
  })
}
