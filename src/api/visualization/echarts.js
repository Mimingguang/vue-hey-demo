import http from '@/utils/http';

export function getChartPie(data) {
  return http({
    url: '/chart/pie',
    method: 'post',
    data
  });
}
