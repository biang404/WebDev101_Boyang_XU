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

document.getElementById("fetchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value;

  // 简单地获取经纬度（可以换成更专业的 API）
  const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`).then(r => r.json());

  if (!geo.results || geo.results.length === 0) {
    alert("City not found.");
    return;
  }

  const { latitude, longitude, name, country } = geo.results[0];
  document.getElementById("locationLabel").innerText = `📍 ${name}, ${country}`;

  const { labels, averages } = await fetchTemperatureData(latitude, longitude);
  renderChart(labels, averages);
});
