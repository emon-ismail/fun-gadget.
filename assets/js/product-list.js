document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 16;
    let currentPage = 1;
    let products = [];

    // Fetch JSON data
    fetch('product.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderPage(currentPage); // Render the first page
            renderPaginationButtons(); // Render pagination buttons
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to render a specific page
    function renderPage(page) {
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = ''; // Clear the container

        // Calculate the start and end index for the current page
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productsToShow = products.slice(startIndex, endIndex);

        // Iterate over the current page's products
        productsToShow.forEach(product => {
            // Create a Bootstrap card for each product
            const card = document.createElement('div');
            card.className = 'col-md-3 col-6 mb-4';
            card.innerHTML = `
                <div class="card fixed-height-card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h6 class="card-title text-truncate">${product.name}</h6>
                        <p class="card-text">Price: $${product.price}</p>
                    </div>
                </div>
            `;
            productContainer.appendChild(card); // Append the card to the container
        });
        

        // Update pagination buttons
        updatePaginationButtons();
    }

    // Function to update pagination buttons
    function updatePaginationButtons() {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        const paginationContainer = document.getElementById('pagination-buttons');
        paginationContainer.innerHTML = ''; // Clear previous buttons

        // Create "Previous" button
        const prevButton = document.createElement('button');
        prevButton.className = 'btn btn-primary mx-1';
        prevButton.innerText = 'Previous';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', function () {
            if (currentPage > 1) {
                currentPage--;
                renderPage(currentPage);
                renderPaginationButtons();
            }
        });
        paginationContainer.appendChild(prevButton);

        // Create numbered pagination buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = `btn mx-1 ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'}`;
            pageButton.innerText = i;
            pageButton.addEventListener('click', function () {
                currentPage = i;
                renderPage(currentPage);
                renderPaginationButtons();
            });
            paginationContainer.appendChild(pageButton);
        }

        // Create "Next" button
        const nextButton = document.createElement('button');
        nextButton.className = 'btn btn-primary mx-1';
        nextButton.innerText = 'Next';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', function () {
            if (currentPage < totalPages) {
                currentPage++;
                renderPage(currentPage);
                renderPaginationButtons();
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    // Function to render pagination buttons
    function renderPaginationButtons() {
        const paginationContainer = document.getElementById('pagination-buttons');
        paginationContainer.innerHTML = ''; // Clear the container
        updatePaginationButtons();
    }
});








// left side menu data render



// left side menu data render