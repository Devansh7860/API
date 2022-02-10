// 'https://v6.exchangerate-api.com/v6/8a4600afb25e3e02ed974cc2/latest/{country}')
//'https://api.chucknorris.io/jokes/random'
//'https://v6.exchangerate-api.com/v6/8a4600afb25e3e02ed974cc2/latest/{country}'
// 'http://api.openweathermap.org/data/2.5/weather?q={city,country}&appid=d25a489495cc3f36f3029592a123031a'
// https://data.covid19india.org/data.json
// https://www.mohfw.gov.in/data/datanew.json  // OFFICIAL GOVERNMENT DATA !


// ---------------------------- CURRENCY CONVERTER -----------------------------

let countrySelector = document.getElementById("fromCountry");
let amount = document.getElementById("toCountry");
let toAmount = document.getElementById("toAmount");
let fromAmount = document.getElementById("fromAmount");
let convertBtn = document.getElementById("convertBtn");

let displaySelectValues = async() => {
    let res = await fetch('https://v6.exchangerate-api.com/v6/8a4600afb25e3e02ed974cc2/latest/USD');
    let data = await res.json();

    for ( i = 0; i < Object.keys(data.conversion_rates).length; i++){
        countrySelector.innerHTML += `<option> ${Object.keys(data.conversion_rates)[i]} </option>`
    }
    for ( i = 0; i < Object.keys(data.conversion_rates).length; i++){
        amount.innerHTML += `<option> ${Object.keys(data.conversion_rates)[i]} </option>`
    } 
}
displaySelectValues()

let convert = async () => {
    try {
        let baseVal = countrySelector.value;
        let res = await fetch(`https://v6.exchangerate-api.com/v6/8a4600afb25e3e02ed974cc2/latest/${baseVal}`);
        let data = await res.json();
        let toCountry = amount.value.toUpperCase();
        let toCountryRate = data.conversion_rates[toCountry];
        
        toAmount.value = fromAmount.value * toCountryRate
    } 
    catch{
        console.log("No currency found ! ");
    }
};
convertBtn.addEventListener("click", convert);



// ---------------------------- CORONA TRACKER -----------------------------

let cityBtn = document.getElementsByClassName('cityBtn')[0]
let cityInput = document.getElementsByClassName('cityInput')[0]

let findCityData = async() => {

    let city = cityInput.value;
    let res2 = await fetch('https://www.mohfw.gov.in/data/datanew.json')
    let data2 = await res2.json()

    let cityArr = []
    for ( i = 0; i < data2.length - 1; i++){
        cityArr.push(data2[i].state_name.toLowerCase())
    }
    let cityIndex = cityArr.indexOf(`${city.toLowerCase()}`)

    confirmCase = document.body.getElementsByClassName('confirmed')[0].getElementsByTagName('h4')[0]
    confirmCasePlus = document.body.getElementsByClassName('confirmed')[0].getElementsByTagName('h5')[0]
    recoverCase = document.body.getElementsByClassName('recovered')[0].getElementsByTagName('h4')[0]
    recoverCasePlus = document.body.getElementsByClassName('recovered')[0].getElementsByTagName('h5')[0]
    deathCase = document.body.getElementsByClassName('death')[0].getElementsByTagName('h4')[0]
    deathCasePlus = document.body.getElementsByClassName('death')[0].getElementsByTagName('h5')[0]

    if(cityIndex == -1){
        confirmCase.innerText = 'NOT FOUND!'
        confirmCasePlus.innerText = ''
        recoverCase.innerText = 'NOT FOUND!'
        recoverCasePlus.innerText = ''
        deathCase.innerText = 'NOT FOUND!'
        deathCasePlus.innerText = ''
    }
    else{
        deathCase.innerText = data2[cityIndex].death
        deathCasePlus.innerText = '+' + `${Number(data2[cityIndex].new_death) - Number(data2[cityIndex].death)}`

        confirmCase.innerText = data2[cityIndex].new_positive
        confirmCasePlus.innerText = '+' + `${Number(data2[cityIndex].new_positive) - Number(data2[cityIndex].positive)}`

        recoverCase.innerText = data2[cityIndex].new_cured
        recoverCasePlus.innerText = '+' + `${Number(data2[cityIndex].new_cured) - Number(data2[cityIndex].cured)}`
    }
        
}

cityBtn.addEventListener('click' , findCityData)

// ---------------------------- WEATHER UPDATES -----------------------------

let cityBtn2 = document.getElementsByClassName('cityBtn')[1]
let cityInput2 = document.getElementsByClassName('cityInput')[1]

let getWeatherUpdate = async() => {

    let city2 = cityInput2.value;
    let res2 = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city2}&appid=d25a489495cc3f36f3029592a123031a`)

    let cityName = document.getElementsByClassName('weather-cart-inner1')[0].getElementsByTagName('h3')[0]
    let date = document.getElementsByClassName('weather-cart-inner1')[0].getElementsByTagName('h5')[0]
    let tempH1 = document.getElementsByClassName('weather-cart-temp')[0].getElementsByTagName('h1')[0]
    let humidity = document.getElementById('humidity')
    let pressure = document.getElementById('pressure')
    let wind = document.getElementById('wind')
    let visibility = document.getElementById('visibility')

    if (res2.status >= 200 && res2.status <= 299) {
        let data2 = await res2.json()
        cityName.innerText = city2.toUpperCase()
        date.innerHTML = new Date().toDateString()
        tempH1.innerHTML = `${Math.trunc((data2.main.temp_max + data2.main.temp_min ) / 2 - 273)}&#x2103`;
        tempH1.style.visibility = 'visible'    
        humidity.innerHTML = ` Humidity : ${data2.main.humidity}%`    
        pressure.innerHTML = ` Pressure : ${data2.main.pressure}`    
        wind.innerHTML = ` Wind : ${data2.wind.speed} m/s`    
        visibility.innerHTML = ` Visibility : ${data2.visibility / 1000} km`    
        
    }
    else {
        cityName.innerText = 'No City Found !'
        tempH1.innerHTML = ''
        tempH1.style.visibility = 'hidden'
        pressure.innerHTML = ' Pressure : '
        humidity.innerHTML = ' Humidity : '
        wind.innerHTML = ' Wind : '
        visibility.innerHTML = ' Visibility : '
    }
    
}

cityBtn2.addEventListener('click' , getWeatherUpdate)


// ------------------------------- MEME GENERATOR---------------------------


let jokeBtn = document.getElementById('getJokeBtn')
let memeArea = document.getElementsByClassName('memeArea')[0]

let getMeme = async() => {
    let res3 = await fetch(' https://meme-api.herokuapp.com/gimme')
    let data3 = await res3.json()
    let imgURL = data3.url
    memeArea.innerHTML = `<img src = ${imgURL} height = "150" width = "300" alt = "OOPSS....">`

}


jokeBtn.addEventListener('click' , getMeme)
