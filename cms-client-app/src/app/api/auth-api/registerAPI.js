
import axios from 'axios';

export default async function registerHandler(req, res) {
    if (req.method === 'POST') {
        try {
            const { username, password, email } = req.body;
            const response = await axios.post('http://localhost:9595/register', {
                username,
                password,
                email,
            });

            console.log('In registerAPI.js, line: 14 ', response.data);
            // send status 200 and the response data, without json() method
            return {
                status: 200,
                message: response.data.message,
            }
        } catch (error) {
            res.status(400).json({ error: error.response.data });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
