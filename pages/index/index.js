import { fetchWeatherDetails } from "../../api.js";

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    position: {
      latitude: '',
      longitude: ''
    },
    showWeatherDetail: false,
    weather: {
      daily: [],
      location: {
        name: ''
      }
    },
    rainingTmr: null,
    today: 0
  },
  onLoad: function () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          position: {
            latitude: res.latitude, // the latitude to current position
            longitude: res.longitude // the longitude to current position
          },
        })
      },
      fail: (res) => {
        wx.showToast('突然找不到当前位置，没法知道这里天气怎么样呢！')
      }
    })
  },

  onTapToBack: function() {
    this.setData({
      showWeatherDetail: false
    });
  },

  onTapToFetchTodayWeather: function () {
    this.onTapToFetchWeather('today');
  },

  onTapToFetchTmrWeather: function () {
    this.onTapToFetchWeather('tmr');
  },

  onTapToFetchWeather: function (day) {
    const { position } = this.data;
    fetchWeatherDetails(position.latitude, position.longitude,
      (response) => {
        this.setData({
          showWeatherDetail: true,
          weather: response.data.results[0],
          today: day === 'today' ? 0 : 1
        });
        this.setData({
          rainingTmr: (this.data.weather.daily[1].code_day >= 10 && this.data.weather.daily[1].code_day <= 24 || this.data.weather.daily[1].code_night >= 10 && this.data.weather.daily[1].code_night <= 24)
        })
        console.log('State:', this.data);
      },
      () => {
        wx.showToast('尴尬！！没找到这里的天气情况！')
      }
    )
  }
})
