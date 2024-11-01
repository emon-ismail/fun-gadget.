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
               // Add event listener to the card to navigate to product details page
        card.addEventListener('click', function () {
          window.location.href = `product-details.html?id=${product.id}`;
      });

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






document.addEventListener('DOMContentLoaded', () => {
    // Fetch JSON data
    fetch('menuData.json')
      .then(response => response.json())
      .then(data => renderMenu(data))
      .catch(error => console.error('Error fetching the menu data:', error));

    function renderMenu(menuData) {
      const menuList = document.getElementById('menuList');

      menuData.forEach((item, index) => {
        const liElement = document.createElement("li");
        liElement.classList.add("list-group-item", "text-center", "mx-md-0", "text-lg-start", "my-1", "w-100");

        // If it's the first item, add the bg-active class
        if (index === 0) {
          liElement.classList.add("bg-active"); // Apply background color to first li
        }

        // Check if the item has subcategories
        if (item.subcategories) {
          const aElement = document.createElement("a");
          aElement.classList.add("dropdown-toggle", "text-center");
          aElement.setAttribute("href", "#");
          aElement.setAttribute("data-bs-toggle", "dropdown");
          aElement.textContent = item.title;

          // Apply white text only to the first item
          if (index === 0) {
            aElement.classList.add("text-white"); // Apply text color to first a element
          }

          liElement.appendChild(aElement);

          const dropdownMenu = document.createElement("ul");
          dropdownMenu.classList.add("dropdown-menu");

          item.subcategories.forEach(sub => {
            const subLi = document.createElement("li");
            const subA = document.createElement("a");
            subA.classList.add("dropdown-item");
            subA.setAttribute("href", sub.link); // Bind the link from JSON
            subA.textContent = sub.name;
            subLi.appendChild(subA);
            dropdownMenu.appendChild(subLi);
          });

          liElement.appendChild(dropdownMenu);
        } else {
          const aElement = document.createElement("a");
          aElement.classList.add("text-dark", "text-center", "d-block");
          aElement.setAttribute("href", item.link); // Bind the link from JSON
          aElement.textContent = item.title;

          // Apply white text only to the first item
          if (index === 0) {
            aElement.classList.add("text-white"); // Apply text color to first a element
          }

          liElement.appendChild(aElement);
        }

        menuList.appendChild(liElement);
      });
    }
});




// navbar dynamic

// navbar dynamic


