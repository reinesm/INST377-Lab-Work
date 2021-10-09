const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

let cities = [];

fetch(endpoint)
    .then((blob => blob.json())
    .then((data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        //here we need to figure out if the city or state matches was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex)
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
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
searchInput.addEventListener('keyup', displayMatches);

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

function mainThread() {
    console.log('loaded main script');
    const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

    /*Actually linked script example*/
    const targetElement = document.querySelector('.click_demo');
    targetElement.addEventListener('click', (event) => runMeOnClickEvent(event));

    const fetchElement = document.querySelector('.fetch');
    fetchElement.addEventListener('click', async (event) => {
        const data = await fetchRequest(url);
        console.log('dataset size from county', data.length);
        const displaySet = data.filter((item, index) => {
            const zipcode = '20742';
            return item.zip === zipcode;
        });
        console.long('displaySet contents', displaySet.length);
    });

    const inputBox = document.querySelector('#zipcode');
    inputBox.addEventListener('input', (event) => {
        console.log(event.target.value);
    })
}

window.onload = mainThread;