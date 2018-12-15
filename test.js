const loadData = require('./src/weatherProvider.js');

async function testLoading(cityName, plusDays) {
    const data = await loadData(cityName, plusDays);
    console.log(data);
}

testLoading('Pardubice', 0);
testLoading('Hradec Kralove', 2);
