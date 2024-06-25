const api = 'https://api.open-meteo.com/v1/forecast?latitude=35.7&longitude=139.6875&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FTokyo&forecast_days=3';

function getData() {
    fetch(api)
    .then(response => response.json())
    .then(data => makePage(data));
  }

getData();
setInterval(getData,1000 * 60 * 60);

function makePage(data) {
  setData('day0', dateFormat(data.daily.time[0]));
  setData('day1', dateFormat(data.daily.time[1]));

  setData('weathercode0', getWMO(data.daily.weather_code[0]));
  setData('weathercode1', getWMO(data.daily.weather_code[1]));

  setData('temperature_max0', data.daily.temperature_2m_max[0] + '°C');
  setData('temperature_max1', data.daily.temperature_2m_max[1] + '°C');

  setData('temperature_min0', data.daily.temperature_2m_min[0] + '°C');
  setData('temperature_min1', data.daily.temperature_2m_min[1] + '°C');

  setData('precipitation_sum0', data.daily.precipitation_sum[0] + 'mm');
  setData('precipitation_sum1', data.daily.precipitation_sum[1] + 'mm');


if ( data.daily.precipitation_sum[0] > 0 ) {
    document.getElementById('body').style.backgroundImage
     = 'linear-gradient(#ccf 5%, #fff 10%)';
  } else {
    document.getElementById('body').style.backgroundImage
     = 'linear-gradient(#fec 5%, #fff 10%)';
  }
}

function setData(id,data) {
  document.getElementById(id).innerHTML = data;
}

function dateFormat(date, mode) {
    let dateObject = new Date(date);
  
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
  
    const hour = add0(dateObject.getHours());
    const minute = add0(dateObject.getMinutes());
    const second = add0(dateObject.getSeconds());
  
    if(mode == 1) {
      return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
    } else {
      return month + '月' + day + '日';
    }
  }

function add0 (val) {
  if(val < 10) {
    val = '0' + val;
  }
  return val;
}
  


  function updateScreen() {
    setData('time',dateFormat(new Date(),1));
  }
  window.onload=updateScreen;

  setInterval(updateScreen,1000);