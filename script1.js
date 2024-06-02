document.addEventListener('DOMContentLoaded', function () {
    const cars = [
        { model: "טויטה יאריס", price: "$20,000", make: "Toyota", year: "2013", imageName: "Toyota-Yaris-2013-01.jpeg" },
        { model: "קיה ריו ", price: "$25,000", make: "Kia", year: "2021", imageName: "kia rio.jpeg" },
        { model: "במ.וו סדרה 4 ", price: "$30,000", make: "BMW", year: "2023", imageName: "serise 4.jpeg" },
        { model: "C300 מרצדס", price: "$30,000", make: "MERCEDS", year: "2020", imageName: "c300.jpeg" },
        { model: "T-max 560", price: "$30,000", make: "YAMAHA", year: "2021", imageName: "TMAX-560-Tech-MAX-6.jpeg" },
        { model: "X-max350", price: "$30,000", make: "YAMAHA", year: "2020", imageName: "xmax.jpeg" },
        { model: "מודל 3", price: "$30,000", make: "TESLA", year: "2021", imageName: "model3.jpeg" },
        { model: "vaspa a350", price: "$30,000", make: "vaspa", year: "2013", imageName: "vespa.png" },
        { model: "x-adv", price: "$30,000", make: "HONDA", year: "2020", imageName: "x adv.jpeg" },
        { model: "R7", price: "$30,000", make: "YAMAHA", year: "2023", imageName: "r7.jpeg" },
        { model: "wrangler", price: "300,000", make: "JEEP", year: "2023", imageName: "rubi.jpeg" },
        { model: "gladiatur", price: "250,000", make: "JEEP", year: "2023", imageName: "gladi.jpeg" },
    ];

    const carContainer = document.getElementById('carContainer');
    const filterButton = document.getElementById('filterButton');
    const filterModal = document.getElementById('filterModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const applyFiltersButton = document.getElementById('applyFilters');
    const makeFilter = document.getElementById('make');
    const modelFilter = document.getElementById('model');
    const yearFilter = document.getElementById('year');

    function displayCars(filteredCars) {
        carContainer.innerHTML = '';
        filteredCars.forEach(car => {
            const carCard = document.createElement('div');
            carCard.classList.add('car-card');
            carCard.innerHTML = `
                <img src="${car.imageName}" alt="${car.make} ${car.model}">
                <div class="car-info">
                    <h3>${car.make} ${car.model} ${car.year}</h3>
                    <p>${car.price}</p>
                    <button class="btn buy-btn">Buy</button>
                </div>
            `;
            carContainer.appendChild(carCard);
        });
    }

    displayCars(cars); // Display all cars by default

    filterButton.addEventListener('click', function () {
        filterModal.style.display = 'block';
    });

    closeModal.addEventListener('click', function () {
        filterModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == filterModal) {
            filterModal.style.display = 'none';
        }
    });

    applyFiltersButton.addEventListener('click', function () {
        const selectedMake = makeFilter.value;
        const selectedModel = modelFilter.value;
        const selectedYear = yearFilter.value;

        const filteredCars = cars.filter(car => {
            return (selectedMake === 'all' || car.make === selectedMake) &&
                (selectedModel === 'all' || car.model === selectedModel) &&
                (selectedYear === 'all' || car.year === selectedYear);
        });

        displayCars(filteredCars);
        filterModal.style.display = 'none';
    });

    // Update model options based on the selected make
    makeFilter.addEventListener('change', function () {
        const selectedMake = makeFilter.value;
        modelFilter.innerHTML = '<option value="all">הכל</option>'; // Reset models
        yearFilter.innerHTML = '<option value="all">הכל</option>'; // Reset years

        if (selectedMake === 'הכל') {
            modelFilter.disabled = true;
            yearFilter.disabled = true;
        } else {
            modelFilter.disabled = false;
            yearFilter.disabled = false;
            const uniqueModels = [...new Set(cars.filter(car => car.make === selectedMake).map(car => car.model))];
            uniqueModels.forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                modelFilter.appendChild(option);
            });
            updateYearOptions();
        }
    });

    // Update year options based on the selected make and model
    modelFilter.addEventListener('change', updateYearOptions);

    function updateYearOptions() {
        const selectedMake = makeFilter.value;
        const selectedModel = modelFilter.value;
        yearFilter.innerHTML = '<option value="all">הכל</option>'; // Reset years

        const filteredCars = cars.filter(car => {
            return (selectedMake === 'הכל' || car.make === selectedMake) &&
                (selectedModel === 'הכל' || car.model === selectedModel);
        });

        const uniqueYears = [...new Set(filteredCars.map(car => car.year))];
        uniqueYears.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        });
    }
});
