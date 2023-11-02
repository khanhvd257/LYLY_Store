import request, {Method} from "@/api/axios"

export function getAllProduct (params){
  return request({
    url: '/product',
    headers: { 'Content-Type': 'application/json'},
    method: Method.GET,
    needToken: true,
    params: params
  });
}

export function getDetailProduct (id){
  return request({
    url: `/product/${id}`,
    headers: { 'Content-Type': 'application/json'},
    method: Method.GET,
    needToken: true,
  });
}

export function createProduct (data){
  return request({
    url: '/product',
    headers: { 'Content-Type': 'application/json'},
    method: Method.POST,
    needToken: true,
    data: data
  });
}
export function getCategory (){
  return request({
    url: '/category',
    headers: { 'Content-Type': 'application/json'},
    method: Method.GET,
    needToken: true,
  });
}
