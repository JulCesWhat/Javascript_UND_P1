
// Create Dino Constructor
function Dino(newDino) {
    this.species = newDino.species || '';
    this.weight = newDino.weight || 0;
    this.height = newDino.height || 0;
    this.diet = newDino.diet || '';
    this.where = newDino.where || '';
    this.when = newDino.when || '';
    this.fact = newDino.fact || '';
    this.factList = [newDino.fact, 'This is an old animal.', 'This is extinct.'];

    this.campareDinoDiet = function campareDinoDiet(human) {
        if (this.diet === human.diet) {
            this.factList.push(`${this.species} has the same diet as ${human.species}`)
        } else {
            this.factList.push(`${this.species} does not have the same diet as ${human.species}`)
        }
    };

    this.campareDinoWeight = function campareDinoWeight(human) {
        if (this.weight === human.weight) {
            this.factList.push(`${this.species} has the same weigth as ${human.species}`)
        } else {
            this.factList.push(`${this.species} does not have the same weigth as ${human.species}`)
        }
    };

    this.campareDinoHeight = function campareDinoHeight(human) {
        if (this.height === human.height) {
            this.factList.push(`${this.species} has the same height as ${human.species}`)
        } else {
            this.factList.push(`${this.species} does not have the same height as ${human.species}`)
        }
    };
};

let dinoList = [];

(function getData() {

    // Create Dino Objects
    fetch('./dino.json')
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('HTTP error ' + response.status);
            }
        }).then((res) => {
            dinoList = res.Dinos.map((dino) => {
                return new Dino(dino)
            });
        }).catch((error) => {
            // Catch error
        });
})();



// Create Human Object

// Use IIFE to get human data from form
const humanData = (function () {

    function getUserData(form) {
        const height = (parseInt(form.feet.value) * 12) + parseInt(form.inches.value);
        return new Dino({
            species: form.name.value,
            weight: parseInt(form.weight.value),
            height,
            diet: (form.diet.value).toLowerCase(),
            where: '',
            when: '',
            fact: ''
        });
    };

    return {
        getUserData: getUserData
    };
})();


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.


function manipulateDOM() {

    // Generate Tiles for each Dino in Array
    let innerHtml = '';
    dinoList.forEach((dino) => {
        const imgSrc = dino.when ? dino.species : 'human';
        if (dino.species !== 'Pigeon' && imgSrc !== 'human') {
            dino.fact = dino.factList[Math.floor(Math.random() * (dino.factList.length - 1))];
        }

        innerHtml += `<div class="grid-item"><h3>${dino.species}</h3><img src="./images/${imgSrc}.png" /><p>${dino.fact}</p></div>`
    });

    // Add tiles to DOM
    document.getElementById('grid').innerHTML = innerHtml;

    // Remove form from screen
    var dino_form = document.getElementById('dino-compare');
    dino_form.parentNode.removeChild(dino_form);
}

function processBtnClick(form) {
    const human = humanData.getUserData(form);
    dinoList.forEach((dino) => {
        dino.campareDinoDiet(human);
        dino.campareDinoWeight(human);
        dino.campareDinoHeight(human);
    });
    dinoList.splice(4, 0, human);
    this.manipulateDOM();
}

// On button click, prepare and display infographic
let form = document.getElementById("dino-compare");
let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
    if (form.name.value && form.feet.value && form.inches.value && form.weight.value && form.diet.value) {
        this.processBtnClick(form);
    } else {
        console.log('invalid');
    }
});