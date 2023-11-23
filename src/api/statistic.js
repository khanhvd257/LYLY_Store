import request, { Method } from "@/api/axios"

export function thongKeDoanhThuNam() {
  return request({
    url: '/statistic',
    headers: { 'Content-Type': 'application/json' },
    method: Method.GET,
  })
}

export function thongKeThang() {
  return request({
    url: '/statistic/order',
    headers: { 'Content-Type': 'application/json' },
    method: Method.GET,
  })
}

export function thongKeDoanhThuThang() {
  return request({
    url: '/statistic/overview',
    headers: { 'Content-Type': 'application/json' },
    method: Method.GET,
  })
}

export function thongKeSanPham(param) {
  return request({
    url: '/statistic/product',
    headers: { 'Content-Type': 'application/json' },
    method: Method.GET,
    params: param,
  })
}
