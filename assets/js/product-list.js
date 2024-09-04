
document.addEventListener('DOMContentLoaded', function() {
    // Fetch JSON data
    fetch('product.json')
        .then(response => response.json())
        .then(data => {
            const productContainer = document.getElementById('product-container');
  
            // Iterate over the array of products
            data.forEach(product => {
                // Create a Bootstrap card for each product
                const card = document.createElement('div');
                card.className = 'col-md-3 col-6 mb-4';
                card.innerHTML = `
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">Price: $${product.price}</p>
                        </div>
                    </div>
                `;
  
                // Append the card to the container
                productContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
  });
  
  