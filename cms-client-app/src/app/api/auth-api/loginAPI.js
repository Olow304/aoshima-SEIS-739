import axios from "axios";

export default async function loginHandler(req, res) {
    console.log('In loginAPI.js, line: 4 ', req);
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;
            const response = await axios.post('http://localhost:9595/login', {
                email,
                password,
            });

            console.log('In loginAPI.js, line: 12 ', response.data);
            return {
                status: 200,
                token: response.data.token,
            }

            res.status(200).json(response.data);
        } catch (error) {
            res.status(400).json({ error: error.response.data });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}