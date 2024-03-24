// Function to load discussions from JSON file
function loadDiscussions() {
    fetch('discussion.json')
    .then(response => response.json())
    .then(data => {
        displayDiscussions(data);
    });
}

// Function to display discussions
function displayDiscussions(discussions) {
    const discussionDiv = document.querySelector('.discussion');
    discussionDiv.innerHTML = '';

    discussions.forEach((discussion, index) => {
        const row = document.createElement('div');
        row.classList.add('row');

        // Set tag colors based on tag value
        const tagColors = {
            'Promotion': 'green',
            'Hot Topic': 'red',
            'new': 'blue'
        };

        const tagElements = discussion.tags.map(tag => {
            const color = tagColors[tag] || ''; // Use default color if tag not found in tagColors
            return `<span class="tag" style="background-color: ${color};">${tag}</span>`;
        }).join('');

        row.innerHTML = `
            <div class="profile-pic">
                <img src="./images/user.jpg" alt="${discussion.username}">
            </div>
            <div class="username">
                <p>${discussion.username}</p>
                <div class="tags">
                    ${tagElements}
                </div>
                <p>${discussion.content}</p>
                <div class="like-dislike">
                <img id="likeBtn${index + 1}" src="./images/like.png" alt="Like" onclick="document.getElementById('likeBtn${index + 1}').src='./images/liked.png'">
                    <img id="dislikeBtn${index + 1}" src="./images/dislike.png" alt="Dislike" onclick="document.getElementById('dislikeBtn${index + 1}').src='./images/disliked.png'">
                    <img src="./images/comment.png" alt="Comment">
                </div>
            </div>
        `;

        discussionDiv.appendChild(row);
    });
}

// Function to filter discussions based on search query
function filterDiscussions(query) {
    const discussions = document.querySelectorAll('.row'); // Select all discussion rows
    discussions.forEach(discussion => {
        const username = discussion.querySelector('.username p').textContent.toLowerCase();
        const content = discussion.querySelector('.username p:last-of-type').textContent.toLowerCase();
        const tags = discussion.querySelectorAll('.tag');
        let found = false;
        tags.forEach(tag => {
            if (tag.textContent.toLowerCase().includes(query.toLowerCase())) {
                found = true;
            }
        });
        if (username.includes(query.toLowerCase()) || content.includes(query.toLowerCase()) || found) {
            discussion.style.display = 'block'; // Show discussion if matches search query
        } else {
            discussion.style.display = 'none'; // Hide discussion if does not match search query
        }
    });
}


// Event listener for search bar
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', () => {
    const query = searchBar.value.trim();
    filterDiscussions(query);
});


// Load discussions when the page loads
loadDiscussions();
