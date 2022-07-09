// IPO Input -> Process -> Output

// Constants and State Variables (Data): (Constants) Info that never changes

// Constant Data
const BASE_URL = 'https://swapi.dev/api/people/'

// State Data
let starwarsData, starwarsDetail;

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

function getData(detailURL){

    // declare a local variable to take whichever URL we need
    let url;

    if (detailURL === undefined) {
        // we want all STARWARS people
        url = BASE_URL
    } else {
        // we want single STARWARS person
        url = detailURL;
    }
    // Needs to fetch data using AJAX
    $.ajax(url).then(function(data){
    // then take returned data and assignt it to global (state) variable
    // we are gettin all the starwars data
    if(detailURL === undefined){
        starwarsData = data;
        render();
    } else {
        // we are getting single object
        starwarsDetail = data;
        // call render and tell the function that it needs to display a modal
        render(true);
    }
        
    // call render() to visualize it to the DOM

    }, function(error){
        console.log('Error:', error)
    });
}

function handleClick(){
    getData(this.dataset.url)
}

function render(showModal){
    if(showModal === true){
        //show the modal
        // generate the html for the inner content for the modal
        // call the modal function on the modal element
        const $modalContent = $(`
            <h5>${starwarsDetail.name}</h5>
            <p>Birth Year: ${starwarsDetail.birth_year}</p>
            <p>Height: ${starwarsDetail.height}</p>
            <p>Hair Color: ${starwarsDetail.hair_color}</p>
        `);

        const $modal = $('#starmodal');
        $modal.html($modalContent)
        $modal.modal();

    } else {
        // map over the objects inside of starwarsData results array
        // dynamicaly generate html for each element in the array
        // add that html to collection element
        
        const htmlArray = starwarsData.results.map(people => {
            return `
            <article data-url="${people.url}"class=" flex-ctr card">
                <h3>${people.name}</h3>
            </article>`;
        });
        $section.html(htmlArray);
    }
}