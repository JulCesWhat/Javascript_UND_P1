
    // Create Dino Constructor
    function Dino(newDino) {
        this.species = newDino.species || '';
        this.weight = newDino.weight || 0;
        this.height = newDino.height || 0;
        this.diet = newDino.diet || '';
        this.where = newDino.where || '';
        this.when = newDino.when || '';
        this.fact = newDino.fact || '';
        this.equalHumanDiet = false;
        this.equalHumanWeight = false;
        this.equalHumanHeight = false;
    };

    let dinoList = [];
    let factList = [];

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
                factList = res.Dinos.map((dino) => (dino.fact));
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
                diet: form.diet.value,
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
    function campareDinoDiet(dino, human) {
        if (dino.diet === human.diet) {
            this.equalHumanDiet = true;
        }
    };
    

    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function campareDinoWeight(dino, human) {
        if (dino.weight === human.weight) {
            dino.equalHumanWeight = true;
        }
    };

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function campareDinoHeight(dino, human) {
        if (dino.species === human.species) {
            dino.equalHumanHeight = true;
        }
    };


    function manipulateDOM() {

        // Generate Tiles for each Dino in Array
        let innerHtml = '';
        dinoList.forEach((dino) => {
            const imgSrc = dino.when ? dino.species : 'human';
            if (dino.species !== 'Pigeon') {
                const newFacts = factList.filter((fact) => (fact !== dino.fact));
                dino.fact = newFacts[Math.floor(Math.random() * (newFacts.length - 1))];
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
            this.campareDinoDiet(dino, human);
            this.campareDinoWeight(dino, human);
            this.campareDinoHeight(dino, human);
        });
        dinoList.splice(4, 0, human);
        this.manipulateDOM();
    }

    // On button click, prepare and display infographic
    let form = document.getElementById("dino-compare");
    let btn = document.getElementById("btn");
    btn.addEventListener("click", () => {
        if (form.name.value && form.feet.value && form.inches.value&& form.weight.value && form.diet.value) {
            this.processBtnClick(form);
        } else {
            console.log('invalid');
        }
    });