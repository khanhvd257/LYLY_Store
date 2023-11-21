import request, { Method } from "@/api/axios"

export function getAllProduct(params) {
  return request({
    url: '/product',
    headers: { 'Content-Type': 'application/json' },
    method: Method.GET,
    needToken: true,
    params: params,
  })
}

export function getTop5ProductBestSell() {
  return request({
    url: '/products',
    headers: { 'Content-Type': 'application/json' },
    method: Method.GET,
    needToken: true,
    params: { bestSelling: true },
  })
}

export function getDetailProduct(id) {
  return request({
    url: `/product/${id}`,
    headers: { 'Content-Type': 'application/json' },
    method: Method.GET,
    needToken: true,
  })
}

export function createProduct(data) {
  return request({
    url: '/product',
    headers: { 'Content-Type': 'application/json' },
    method: Method.POST,
    needToken: true,
    data: data,
  })
}

export function updateProduct(id, data) {
  return request({
    url: `/product/${id}`,
    headers: { 'Content-Type': 'application/json' },
    method: Method.PUT,
    needToken: true,
    data: data,
  })
}
export function deleteProduct(id) {
  return request({
    url: `/product/${id}/delete`,
    headers: { 'Content-Type': 'application/json' },
    method: Method.PUT,
    needToken: true,
  })
}

export function getCategory() {
  return request({
    url: '/category',
    headers: { 'Content-Type': 'application/json' },
    method: Method.GET,
    needToken: true,
  })
}

export function getCustomer() {
  return request({
    url: '/customer',
    headers: { 'Content-Type': 'application/json' },
    method: Method.GET,
    needToken: true,
  })
}
