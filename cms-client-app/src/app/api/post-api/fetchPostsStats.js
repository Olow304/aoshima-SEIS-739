async function fetchPostViews(postId) {
    const response = await fetch(`/api/post-views/${postId}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch post views');
    }

    return data.postViews;
}

async function fetchPostCount() {
    const response = await fetch('/api/post-count');
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch post count');
    }

    return data.postCount;
}