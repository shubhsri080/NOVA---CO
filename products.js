const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#product-search");
const priceSort = document.querySelector("#price-sort");
const productCount = document.querySelector("#product-count");
const emptyState = document.querySelector("#empty-state");
const categoryChips = Array.from(document.querySelectorAll(".category-chip"));
const resetButton = document.querySelector("#reset-filters");

if (productGrid && searchInput && priceSort && productCount && emptyState) {
    const products = Array.from(productGrid.querySelectorAll(".product-card"));
    let selectedCategory = "all";

    function updateProducts() {
        const query = searchInput.value.trim().toLowerCase();
        const sort = priceSort.value;
        const visibleProducts = products.filter((product) => {
            const matchesSearch = product.textContent.toLowerCase().includes(query);
            const matchesCategory = selectedCategory === "all" || product.dataset.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        if (sort !== "default") {
            visibleProducts.sort((a, b) => {
                const priceDifference = Number(a.dataset.price) - Number(b.dataset.price);
                return sort === "low" ? priceDifference : -priceDifference;
            });
        }

        products.forEach((product) => { product.hidden = true; });
        visibleProducts.forEach((product) => {
            product.hidden = false;
            productGrid.appendChild(product);
        });

        emptyState.hidden = visibleProducts.length > 0;
        productGrid.hidden = visibleProducts.length === 0;
        productCount.textContent = `Showing ${visibleProducts.length} of ${products.length} pieces`;
    }

    categoryChips.forEach((chip) => {
        chip.addEventListener("click", () => {
            selectedCategory = chip.dataset.category;
            categoryChips.forEach((item) => {
                const active = item === chip;
                item.classList.toggle("is-active", active);
                item.setAttribute("aria-pressed", String(active));
            });
            updateProducts();
        });
    });

    searchInput.addEventListener("input", updateProducts);
    priceSort.addEventListener("change", updateProducts);

    resetButton?.addEventListener("click", () => {
        searchInput.value = "";
        priceSort.value = "default";
        selectedCategory = "all";
        categoryChips.forEach((chip) => {
            const active = chip.dataset.category === "all";
            chip.classList.toggle("is-active", active);
            chip.setAttribute("aria-pressed", String(active));
        });
        updateProducts();
        searchInput.focus();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
            event.preventDefault();
            searchInput.focus();
        }
        if (event.key === "Escape" && document.activeElement === searchInput) {
            searchInput.value = "";
            updateProducts();
            searchInput.blur();
        }
    });

    updateProducts();
}
