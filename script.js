// Chamando todos os elementos a serem manipulados
let main = document.querySelector('main');
let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let countryImg = document.getElementById('countryImg');
let tempImg = document.getElementById('tempImg');
let temperature = document.getElementById('temperature');
let description = document.getElementById('description');
let humidity = document.getElementById('humidity');
let clouds = document.getElementById('clouds');
let pressure = document.getElementById('pressure');
let form = document.querySelector('form');

// Quando o formulário for submetido...
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impedir que a página seja recarregada
    // Se o formulário não estiver vazio
    if(valueSearch.value != '') {
        searchWeather(); // Chamar a função de pesquisa
    // Caso contrário, mostre a mensagem de erro
    } else {
        alert('Digite o nome de uma cidade');
    }
})

// Função para pesquisar a previsão do tempo
async function searchWeather() {
    let apiKey = 'e2c2159c45223268dd6477fff951c6e9' // Chave da API
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${valueSearch.value}&appid=${apiKey}&units=metric&lang=pt_br` // URL da API
    let response =  await fetch(url);
    let data = await response.json();

    // Se a cidade não for encontrada
    if(data.cod == '404') {
        main.classList.add('error');
        setTimeout(() => {
            main.classList.remove('error');
        }, 3000)
        alert('Cidade não encontrada');
        return;
    }

    // Se a cidade for encontrada, mostrar os dados
    city.innerHTML = data.name;
    countryImg.src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
    temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
    tempImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    description.innerHTML = data.weather[0].description;
    clouds.innerHTML = `${data.clouds.all}%`;
    humidity.innerHTML = `${data.main.humidity}%`;
    pressure.innerHTML = `${data.main.pressure}hPa`;
    


    console.log(data);
}