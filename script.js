document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.items-container');
    const searchInput = document.getElementById('searchInput');

    if (container) {
        const cards = Array.from(container.getElementsByClassName('item-card'));
        
        // Sort cards by value (highest first)
        cards.sort((a, b) => {
            const valueA = parseInt(a.querySelector('.value').textContent.match(/\d+/));
            const valueB = parseInt(b.querySelector('.value').textContent.match(/\d+/));
            return valueB - valueA;
        });
        
        // Clear and re-append sorted cards
        container.innerHTML = '';
        cards.forEach(card => container.appendChild(card));
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const cards = document.querySelectorAll('.item-card');
            
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});
