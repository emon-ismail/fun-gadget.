document.addEventListener('DOMContentLoaded', async function() {
    const carouselInner = document.getElementById('carouselItems');
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    const productTitle = document.getElementById('productTitle');
    const productDescription = document.getElementById('productDescription');
    const currentProduct = document.getElementById('currentProduct'); // Get breadcrumb item

    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!productId) {
        console.error("No product ID found in the URL!");
        return;
    }

    try {
        const response = await fetch('/product.json');
        const products = await response.json();

        const productData = products.find(product => product.id === productId);

        if (!productData) {
            console.error("Product not found!");
            return;
        }

        // Update Title and Description
        productTitle.textContent = productData.name || 'Product Title Not Available';
        productDescription.textContent = productData.description || 'Description Not Available';

        // Update Breadcrumb
        currentProduct.textContent = productData.name; // Set breadcrumb to product name

        // Populate Carousel and Thumbnails
        if (!carouselInner || !thumbnailContainer) {
            console.error("Carousel or thumbnail container not found!");
            return;
        }

        carouselInner.innerHTML = '';
        thumbnailContainer.innerHTML = '';

        productData.images.forEach((imageSrc, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            carouselItem.innerHTML = `<img src="${imageSrc}" class="d-block w-100" alt="Product Image ${index + 1}">`;
            carouselInner.appendChild(carouselItem);

            const thumbnailCol = document.createElement('div');
            thumbnailCol.className = 'col-3';
            thumbnailCol.innerHTML = `<img src="${imageSrc}" class="img-thumbnail thumbnail-image ${index === 0 ? 'active' : ''}" alt="Thumbnail ${index + 1}" style="cursor: pointer;">`;
            thumbnailContainer.appendChild(thumbnailCol);

            // Thumbnail click event
            thumbnailCol.addEventListener('click', function() {
                const bootstrapCarousel = new bootstrap.Carousel(document.querySelector('#productCarousel'));
                bootstrapCarousel.to(index);
            });
        });

        // Update Thumbnails on Carousel Slide Change
        const carousel = document.querySelector('#productCarousel');
        carousel.addEventListener('slid.bs.carousel', function(e) {
            const activeIndex = e.to;
            document.querySelectorAll('.thumbnail-image').forEach((thumb, idx) => {
                thumb.classList.toggle('active', idx === activeIndex);
            });
        });

    } catch (error) {
        console.error("Error loading product data:", error);
    }
});
