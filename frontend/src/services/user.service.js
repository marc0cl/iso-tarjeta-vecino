import axios from './root.service';

export const linkBenefitToUser = async (id) => {
    try {
        const { data } = await axios.put(`users/link/${id}`);
        console.log(data.message);
        return data;
    }catch (error) {
        return [null, error.response.data];
    }
}