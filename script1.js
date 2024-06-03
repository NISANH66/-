document.addEventListener('DOMContentLoaded', function () {
    const cars = [
        { model: " יאריס", price: "₪20,000", make: "טויוטה", year: "2013", imageName: "Toyota-Yaris-2013-01.jpeg" },
        { model: " ריו ", price: "₪75,000", make: "קיה", year: "2021", imageName: "kia rio.jpeg" },
        { model: " סדרה 4 ", price: "₪370,000", make: "ב.מ.וו", year: "2023", imageName: "serise 4.jpeg" },
        { model: "C300 ", price: "₪450,000", make: "מרצדס", year: "2020", imageName: "c300.jpeg" },
        { model: "T-max 560", price: "₪80,000", make: "יאממה", year: "2021", imageName: "TMAX-560-Tech-MAX-6.jpeg" },
        { model: "X-max350", price: "₪50,000", make: "יאממה", year: "2020", imageName: "xmax.jpeg" },
        { model: "מודל 3", price: "₪200,000", make: "טסלה", year: "2021", imageName: "model3.jpeg" },
        { model: "vaspa a350", price: "₪36,000", make: "פאגרו", year: "2013", imageName: "vespa.png" },
        { model: "x-adv", price: "₪70,000", make: "הונדה", year: "2020", imageName: "x adv.jpeg" },
        { model: "R7", price: "₪65,000", make: "יאממה", year: "2023", imageName: "r7.jpeg" },
        { model: "wrangler", price: "₪300,000", make: "ג'יפ", year: "2023", imageName: "rubi.jpeg" },
        { model: "gladiatur", price: "₪250,000", make: "ג'יפ", year: "2023", imageName: "gladi.jpeg" },
        { model: "מאזדה 3", price: "₪150,000", make: "מאזדה", year: "2023", imageName: "mazda3.jpeg" },
        { model: "מאזדה cx5", price: "₪190,000", make: "מאזדה", year: "2023", imageName: "cx5.webp" },
    ]

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
                    <br>
                    <a href="https://www.5555.co.il/?utm_source=Google&utm_medium=Search&utm_campaign=KLG-Mimun-Yashir_AWO-BrandExact_Leads_BOF_m3001&utm_term=Exact_Mimun-Yashir-HEB&utm_content=Brand_Exact-%D7%9E%D7%99%D7%9E%D7%95%D7%9F%20%D7%99%D7%A9%D7%99%D7%A8-680751560395&gclid=Cj0KCQjw0_WyBhDMARIsAL1Vz8sL_OaXNFJhkmo-26-bnMQ1qRI3QP_FTjUA7KSyG3vkrKpaLoOUv9MaAoWDEALw_wcB" target="_blank" class="btn buy-btn">לרכישה</a>
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
