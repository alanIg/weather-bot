const fetch = require('node-fetch');

const API_KEY = '043a317849c48405788723e49ee3297d';

const fetchData = (cityName) => new Promise((resolve) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&APPID=${API_KEY}&units=metric`;
    fetch(url)
        .then(res => res.json())
        .then(resolve);
});

function parseRow(rowData) {
    return {
        date: rowData.dt_txt,
        weather: rowData.weather[0].description,
    };
}

async function loadData(cityName, plusDays) {
    const data = await fetchData(cityName);
    if(data.cod !== "200") {
        return {
            result: "error",
            message: data.message,
        }
    }

    const row = data.list[plusDays*8];
    const parsedRow = parseRow(row);
    
    return {
        result: 'success',
        city: data.city,
        ...parsedRow,
    };
}

module.exports = loadData;
