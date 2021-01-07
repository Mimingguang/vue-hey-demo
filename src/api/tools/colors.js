import http from '@/utils/http'

export function getColors(data) {
  return http({
    url: '/tools/colors',
    method: 'post',
    data,
    loading: true
  })
}
