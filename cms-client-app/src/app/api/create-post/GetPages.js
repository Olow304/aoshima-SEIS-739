import axios from "axios";

export default async function getPages(req, res) {
    if (req.method === 'GET') {
        try {
            const authorization = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/get-pages', {
                headers: {
                    Authorization: authorization,
                },
                next: {
                    revalidate: 1,
                }
            });

            console.log('In loginAPI.js, line: 121111 ', response);
            if (response.status === 200) {
                return {
                    status: 200,
                    data: response.data.pages,
                }
            }

            //res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.response });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}