import { baseURL } from './constants';

export const fetchWeatherDetails = (latitude, longitude, successCal, failCal) => {
  wx.request({
    method: 'GET',
    url: baseURL + `/v3/weather/daily.json?key=h4ikzb4kdcns0yrs&location=${latitude}:${longitude}&language=zh-Hans&unit=c&start=0&days=2`,
    success: (res) => {
      if (successCal) successCal(res);
    },
    fail: (res) => {
      if (failCal) failCal(res);
    }
  })
}