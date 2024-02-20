// search.js

document.addEventListener('DOMContentLoaded', function () {
    var searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', performSearch);
    var searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});

async function performSearch() {
    var searchTerm = document.getElementById("searchInput").value.toLowerCase();

    if (searchTerm.trim() !== '') {
        try {
            var response = await fetch('output.json');
            var data = await response.json();
            console.log('Fetched data:', data);
            console.log('Search term:', searchTerm);
            var results = filterResults(data, searchTerm);
            console.log('Search results:', results);
            displayResults(results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } else {
        // Handle empty search term (you can show a message or do nothing)
        console.log('Search term is empty');
    }
}

function filterResults(data, searchTerm) {
    return data.filter(item => {
        // Check if item.title is defined and not null before applying toLowerCase()
        return item.jobTitle && typeof item.jobTitle === 'string' && item.jobTitle.toLowerCase().includes(searchTerm);
    });
}

// Display the results
function displayResults(results) {
    console.log('Results:', results);
    var jobListContainer = document.getElementById('job-list');
    
    // Clear existing content
    jobListContainer.innerHTML = '';

    // Add a "Search Results" header
    var header = document.createElement('h2');
    header.textContent = 'Search Results';
    jobListContainer.appendChild(header);

    if (results.length === 0) {
        jobListContainer.innerHTML = '<p>No results found.</p>';
    } else {
        results.forEach(result => {
            var resultItem = document.createElement('div');
            resultItem.textContent = result.jobTitle; // Update to the correct field
            jobListContainer.appendChild(resultItem);
        });
    }
}

