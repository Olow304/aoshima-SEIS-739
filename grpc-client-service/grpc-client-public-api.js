const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

const { createPage, updatePage, deletePage } = require('./client');

app.use(cors());
app.use(express.json());

app.post('/api/create-page', async (req, res) => {
    try {
        const { title, content } = req.body;
        if (req.headers.authorization) {
            const response = await createPage(title, content, req.headers.authorization);
            res.status(200).json(response);
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.post('/api/update-page', async (req, res) => {
    try {
        const { id, title, content } = req.body;
        console.log('In grpc-client-public-api.js, line: 28 ', id, title, content);
        if (req.headers.authorization) {
            const response = await updatePage(id, title, content, req.headers.authorization);
            res.status(200).json(response);
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.post('/api/delete-page', async (req, res) => {
    try {
        const { id } = req.body;
        if (req.headers.authorization) {
            const response = await deletePage(id, req.headers.authorization);
            res.status(200).json(response);
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})