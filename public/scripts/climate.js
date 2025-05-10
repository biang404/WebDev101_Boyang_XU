// public/scripts/climate/climate.js

async function fetchTemperatureData(lat, lon) {
  const response = await fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=2010-01-01&end_date=2020-12-31&daily=temperature_2m_max&timezone=auto`);
  const data = await response.json();

  const dailyTemps = data.daily.temperature_2m_max;
  const dates = data.daily.time;

  // 平均每年的温度
  const yearTemps = {};
  dates.forEach((date, index) => {
    const year = date.slice(0, 4);
    if (!yearTemps[year]) yearTemps[year] = [];
    yearTemps[year].push(dailyTemps[index]);
  });

  const labels = Object.keys(yearTemps);
  const averages = labels.map(year => {
    const temps = yearTemps[year];
    const sum = temps.reduce((a, b) => a + b, 0);
    return (sum / temps.length).toFixed(2);
  });

  return { labels, averages };
}

async function fetchCurrentAndForecastWeather(lat, lon) {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=5&timezone=auto`);
  const data = await response.json();

  const current = data.current_weather;
  const daily = data.daily;

  return {
    current,
    forecast: daily
  };
}

function renderWeatherInfo(current, forecast) {
  const weatherDiv = document.getElementById("weatherInfo");
  let html = `<h3>🌤️ Météo Actuelle</h3>`;
  html += `<p><strong>Température :</strong> ${current.temperature}°C<br/><strong>Conditions :</strong> ${weatherCodeToText(current.weathercode)}</p>`;
  
  html += `<h3>📅 Prévisions pour les 5 prochains jours</h3><ul>`;
  for (let i = 0; i < forecast.time.length; i++) {
    html += `<li><strong>${forecast.time[i]}</strong> : ${forecast.temperature_2m_min[i]}°C ~ ${forecast.temperature_2m_max[i]}°C, ${weatherCodeToText(forecast.weathercode[i])}</li>`;
  }
  html += `</ul>`;
  weatherDiv.innerHTML = html;
}

function weatherCodeToText(code) {
  const codes = {
    0: "Ciel clair",
    1: "Principalement clair",
    2: "Partiellement nuageux",
    3: "Couvert",
    45: "Brouillard",
    48: "Brouillard givrant",
    51: "Bruine légère",
    61: "Pluie faible",
    80: "Averses légères",
    95: "Orages"
  };
  return codes[code] || "Conditions inconnues";
}

function renderChart(labels, data) {
  const ctx = document.getElementById("chart").getContext("2d");
  if (window.tempChart) window.tempChart.destroy(); // 销毁旧图

  window.tempChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Yearly Avg Max Temp (°C)',
        data: data,
        borderWidth: 2,
        fill: false,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          title: { display: true, text: "Temperature (°C)" }
        },
        x: {
          title: { display: true, text: "Year" }
        }
      }
    }
  });
}

document.getElementById("fetchBtnPast").addEventListener("click", async () => {
  const city = document.getElementById("cityInputPast").value;
  const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`).then(r => r.json());

  if (!geo.results || geo.results.length === 0) {
    alert("城市未找到。");
    return;
  }

  const { latitude, longitude, name, country } = geo.results[0];
  document.getElementById("locationLabelPast").innerText = `📍 ${name}, ${country}`;

  const { labels, averages } = await fetchTemperatureData(latitude, longitude);
  renderChart(labels, averages);
});

document.getElementById("fetchBtnForecast").addEventListener("click", async () => {
  const city = document.getElementById("cityInputForecast").value;
  const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`).then(r => r.json());

  if (!geo.results || geo.results.length === 0) {
    alert("城市未找到。");
    return;
  }

  const { latitude, longitude, name, country } = geo.results[0];
  document.getElementById("locationLabelForecast").innerText = `📍 ${name}, ${country}`;

  const weatherData = await fetchCurrentAndForecastWeather(latitude, longitude);
  renderWeatherInfo(weatherData.current, weatherData.forecast);
});

window.switchView = function(view) {
  document.getElementById("pastView").style.display = (view === "past") ? "block" : "none";
  document.getElementById("forecastView").style.display = (view === "forecast") ? "block" : "none";
}
