// IPO Input -> Process -> Output

// Constants and State Variables (Data): (Constants) Info that never changes

// Constant Data
const BASE_URL = 'https://swapi.dev/api/people/'

// State Data
let starwarsData;

// Cached Element References: Parts of user interfaces that we store in a variable so we can reference and make changes
const $section = $('section');

// Attched Event Listeners 
$section.on('click', 'article', handleClick);


// Functions

// call immediatley

init();

function init(){
    getData();
}

function getData(){
    // Needs to fetch data using AJAX
    $.ajax(BASE_URL).then(function(data){
    // then take returned data and assignt it to global (state) variable
    starwarsData = data;
    // call render() to visualize it to the DOM
        render();

    }, function(error){
        console.log('Error:', error)
    });
}

function handleClick(){
    
}

function render(){
    // map over the objects inside of starwarsData results array
    // dynamicaly generate html for each element in the array
    // add that html to collection element
    const htmlArray = starwarsData.results.map(people => {
        return `
        <article class=" flex-ctr card">
            <h3>${people.name}</h3>
        </article>`;
    });
    $section.html(htmlArray);
}