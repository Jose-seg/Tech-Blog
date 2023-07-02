const displayPosts = async () => {
    const response = await fetch('/api/posts');

    if (response.ok) {
        const posts = await response.json();

        for (let post of posts) {
            // Create a new post element
            let postElement = document.createElement('div');
            postElement.textContent = post.title;

            // Append the post element to the list of posts
            document.querySelector('.post-list').appendChild(postElement);
        }
    } else {
        console.log('Failed to fetch posts');
    }
};

// Call this function when the page loads
displayPosts();
