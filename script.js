// Store changes in localStorage to persist data
const changeLog = {
    changes: JSON.parse(localStorage.getItem('valueChanges')) || [],
    
    addChange: function(item, oldValue, newValue) {
        this.changes.unshift({
            item: item,
            oldValue: oldValue,
            newValue: newValue,
            date: new Date().toISOString(),
            type: 'value_change'
        });
        localStorage.setItem('valueChanges', JSON.stringify(this.changes));
        this.generateUpdateCards();
    },
    
    generateUpdateCards: function() {
        const updatesContainer = document.querySelector('.updates-container');
        if (!updatesContainer) return; // Only run on updates page
        
        let currentDate = null;
        let updateHTML = '';
        
        this.changes.forEach((change, index) => {
            const changeDate = new Date(change.date);
            const formattedDate = changeDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            if (currentDate !== formattedDate) {
                if (currentDate !== null) {
                    updateHTML += '</ul></div>';
                }
                updateHTML += `
                    <div class="update-card">
                        <h2>Update ${this.changes.length - index}</h2>
                        <p class="update-date">${formattedDate}</p>
                        <ul class="update-list">
                `;
                currentDate = formattedDate;
            }
            
            updateHTML += `
                <li>${change.item} value changed from ${change.oldValue} to ${change.newValue}</li>
            `;
        });
        
        if (this.changes.length > 0) {
            updateHTML += '</ul></div>';
        }
        
        updatesContainer.innerHTML = updateHTML || '<div class="update-card"><h2>No updates yet</h2></div>';
    }
};

// Function to update item value
function updateItemValue(itemName, newValue) {
    const itemCards = document.querySelectorAll('.item-card');
    itemCards.forEach(card => {
        const title = card.querySelector('h3').textContent;
        const valueElement = card.querySelector('.value');
        if (title === itemName) {
            const oldValue = parseInt(valueElement.textContent.match(/\d+/));
            valueElement.textContent = `Value: ${newValue}`;
            changeLog.addChange(itemName, oldValue, newValue);
        }
    });
}

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
        changeLog.generateUpdateCards();
    }
});
