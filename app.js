
    // Create Dino Constructor
    function Dino(newDino) {
        this.species = newDino.species;
        this.weight = newDino.weight;
        this.height = newDino.height;
        this.diet = newDino.diet;
        this.where = newDino.where;
        this.when = newDino.when;
        this.fact = newDino.fact;
    };

    var dinoList = [];
    var factList = [];


    // Create Dino Objects
    fetch('./dino.json')
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('HTTP error ' + response.status);
            }
        }).then((res) => {
            this.factList = res.Dinos.map((dino) => (dino.fact));
            this.dinoList = res.Dinos.map((dino) => {
                if (dino.species !== 'Pigeon') {
                    const newFacts = this.factList.filter((fact) => (fact !== dino.fact));
                    dino.fact = newFacts[Math.floor(Math.random() * (newFacts.length - 1))];
                }

                return new Dino(dino)
            });
        }).catch((error) => {
            // Catch error
        });


    // Create Human Object

    // Use IIFE to get human data from form
    var humanData = (function () {

        function getData(form) {
            return new Dino({
                species: form.name.value,
                weight: form.weight.value,
                height: form.feet.value + '' + form.inches.value,
                diet: form.diet.value,
                where: '',
                when: '',
                fact: ''
            });
        };

        return {
            getData: getData
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
        this.dinoList.forEach((dino) => {
            const imgSrc = dino.when ? dino.species : 'human';
            innerHtml += `<div class="grid-item"><h3>${dino.species}</h3><img src="./images/${imgSrc}.png" /><p>${dino.fact}</p></div>`
        });

        // Add tiles to DOM
        document.getElementById('grid').innerHTML = innerHtml;

        // Remove form from screen
        var dino_form = document.getElementById('dino-compare');
        dino_form.parentNode.removeChild(dino_form);
    }


    // On button click, prepare and display infographic
    let form = document.getElementById("dino-compare");
    let btn = document.getElementById("btn");
    btn.addEventListener("click", () => {
        if (form.name.value && form.feet.value && form.inches.value&& form.weight.value && form.diet.value) {
            const capi = this.humanData.getData(form);
            this.dinoList.splice(4, 0, capi);
            this.manipulateDOM();
        } else {
            console.log('invalid');
        }
    });