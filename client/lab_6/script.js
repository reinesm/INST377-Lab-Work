const { visible } = require("chalk");

async function windowActions {
    
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

    const request = await fetch(endpoint)
        .then(blob => blob.json())
        .then(data => cities.push(...data));

    function findMatches(wordToMatch, cities) {
        return cities.filter(place => {
            //here we need to figure out if the city or state matches what was searched
            const regex = new RegExp(wordToMatch, 'gi');
            return place.city.match(regex) || place.state.match(regex)
        });
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function displayMatches(event) {
        const matchArray = findMatches(event.target.value, cities);
        const html = matchArray.map(place => {
            const regex = new RegExp(event.target.value, 'gi');
            const cityName = place.city.replace(regex, `<span class='h1'>${this.value}</span>`);
            const stateName = place.state.replace(regex, `<span class='h1'>${this.value}</span>`);
            return `
            <li>
                <span class="name">${cityName},${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
            `;
        }).join('');
        suggestions.innerHTML = html;
    }

    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', (evt) => {displayMatches(evt)};

    const cities = await request.json();
}

window.onload = windowActions;

//code from lecture

function runMeOnClickEvent(evt) {
}

async function fetchRequest(url) {
    try {
        const request = await fetch(url);
        const json = await request.json();
        console.table(json);
        return json;
    } catch(err){
        console.error(err);
        return err;
    }
}

async function mainThread() {
    console.log('loaded main script');
    const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const inputBox = document.querySelector('#zipcode');
    const visibleListOfFilteredItems = document.querySelector('.append-box');

    /*Actually linked script example*/
    const targetElement = document.querySelector('.click_demo');
    targetElement.addEventListener('click', (event) => runMeOnClickEvent(event));

    const data = await fetchRequest(url)
    console.log('external dataset', data);

    inputBox.addEventListener('input', (event) => {
        console.log(event.target.value);
        const filteredList = data.filter((item, index) => {
            const zipcode = event.target.value;
            return item.zip === zipcode;
        });
        console.table(filteredList);
        
        filteredList.forEach((item, index) => {
            visibleListOfFilteredItems.innerHTML += `<span class='resto-name'>${item.name} <br>`;
        })
    });
}

window.onload = mainThread;

//const fetchElement = document.querySelector('.fetch');
    //fetchElement.addEventListener('click', async (event) => {
        //console.log('dataset size from county', data.length);
        //console.long('displaySet contents', displaySet.length);
    //});
