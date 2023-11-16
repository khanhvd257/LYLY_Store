import request, {Method} from "@/api/axios"

export function chapNhanDonHang (id){
  return request({
    url: `/order/${id}/confirmed`,
    headers: { 'Content-Type': 'application/json'},
    method: Method.PUT,
    needToken: true,
  });
}

export function layDSorder (){
  return request({
    url: 'order',
    headers: { 'Content-Type': 'application/json'},
    method: Method.GET,
    needToken: true,
  });
}

