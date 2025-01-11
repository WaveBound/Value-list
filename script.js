document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.items-container');
    const cards = Array.from(container.getElementsByClassName('item-card'));
    const searchInput = document.getElementById('searchInput');

    // Sort cards by value (highest first)
    cards.sort((a, b) => {
        const valueA = parseInt(a.querySelector('.value').textContent.match(/\d+/));
        const valueB = parseInt(b.querySelector('.value').textContent.match(/\d+/));
        return valueB - valueA;
    });

    // Initial sort
    container.innerHTML = '';
    cards.forEach(card => container.appendChild(card));

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
