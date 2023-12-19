import axios from './root.service';

export const sendMail = async (emailData) => {
    try {
        const { data } = await axios.post('/notifications', emailData);
            return data;
    } catch (error) {
        return [null, error.response.data];
    }
};