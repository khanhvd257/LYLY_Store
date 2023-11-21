import request, { Method } from "@/api/axios"

export function chapNhanDonHang(id) {
  return request({
    url: `/order/${id}/confirmed`,
    headers: { 'Content-Type': 'application/json' },
    method: Method.PUT,
    needToken: true,
  })
}

export function huyOrder() {
  return request({
    url: `/order/${id}/cancel`,
    headers: { 'Content-Type': 'application/json' },
    method: Method.PUT,
    needToken: true,
  })
}

export function layDSorder(params) {
  return request({
    url: 'orders',
    headers: { 'Content-Type': 'application/json' },
    method: Method.GET,
    needToken: true,
    params: params
  })
}
