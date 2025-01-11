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

    // Initialize updates page if we're on it
    if (window.location.pathname.includes('updates.html')) {
        fetch('changes.json')
            .then(response => response.json())
            .then(data => {
                const updatesContainer = document.querySelector('.updates-container');
                let updateHTML = '';

                data.updates.forEach(update => {
                    updateHTML += `
                        <div class="update-card">
                            <h2>${update.version}</h2>
                            <p class="update-date">${update.date}</p>
                            <ul class="update-list">
                                ${update.changes.map(change => 
                                    `<li>${change.item} value changed from ${change.oldValue} to ${change.newValue}</li>`
                                ).join('')}
                            </ul>
                        </div>
                    `;
                });

                updatesContainer.innerHTML = updateHTML;
            });
    }
});
