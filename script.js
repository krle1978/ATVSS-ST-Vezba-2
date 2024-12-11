// Funkcija za pretragu proizvoda
function searchProducts() {
    const query = document.getElementById("search").value.toLowerCase();
    const resultsContainer = document.getElementById("results");
  
    // Čistimo prethodne rezultate
    resultsContainer.innerHTML = '';
  
    // AJAX zahtev za učitavanje JSON podataka
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "products.json", true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const products = JSON.parse(xhr.responseText);
  
        // Filtriranje prema svim parametrima
        const filteredProducts = products.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.price?.toLowerCase().includes(query) ||
          product.manufacturer?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query)
        );
  
        // Prikaz rezultata
        if (filteredProducts.length > 0) {
          filteredProducts.forEach(product => {
            const item = document.createElement("div");
            item.classList.add("result-item");
            item.innerHTML = `
              <img src="assets/${product.name}.jpg" alt="${product.name}" class="product-image">
              <div>
                <strong>${product.name}</strong><br>
                Cena: ${product.price}<br>
                Proizvođač: ${product.manufacturer}<br>
                Kategorija: ${product.category}
              </div>
            `;
            resultsContainer.appendChild(item);
          });
        } else {
          resultsContainer.innerHTML = '<p class="no-results">Nema rezultata</p>';
        }
      }
    };
    xhr.send();
  }
  