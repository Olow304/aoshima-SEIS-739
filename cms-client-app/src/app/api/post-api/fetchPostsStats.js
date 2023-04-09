// async function fetchPostViews(postId) {
//     const response = await fetch(`http://localhost:3001/api/post-views/${postId}`);
//     const data = await response.json();
//
//     if (!response.ok) {
//         throw new Error(data.error || 'Failed to fetch post views');
//     }
//
//     return data.postViews;
// }

import axios from "axios";

export default async function fetchPostCount() {

    const response = await fetch('http://localhost:3001/api/post-count', {
        headers: {
            Authorization: localStorage.getItem('token'),
        }
    });
    const data = await response.json();

    console.log('In fetchPostsStats.js, line: 18 ', data);

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch post count');
    }

    return data.count;
}