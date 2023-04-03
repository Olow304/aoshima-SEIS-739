const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Import your gRPC client
const { getPostCount, getPostViews } = require('./grpc-client');

app.use(cors());
app.use(express.json());

app.get('/api/post-count', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const count = await getPostCount(token);
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/post-views/:id', async (req, res) => {
    const postId = parseInt(req.params.id);
    try {
        const token = req.headers.authorization;
        const views = await getPostViews(postId, token);
        res.status(200).json({ views });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});