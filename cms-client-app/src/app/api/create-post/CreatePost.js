
import axios from "axios";

export default async function createPost(req, res) {
    if (req.method === 'POST') {
        try {
            const { title, content } = req.body;
            const authorization = localStorage.getItem('token');
            const response = await axios.post('http://localhost:4000/api/create-page', {
                title,
                content,
            }, {
                headers: {
                    Authorization: authorization,
                }
            });

            console.log('In loginAPI.js, line: 121111 ', response);
            return {
                status: 200,
                data: response,
            }

            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.response });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}