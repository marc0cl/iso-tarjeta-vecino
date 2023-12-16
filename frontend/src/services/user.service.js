import axios from './root.service';

export const linkBenefitToUser = async (id) => {
    try {
        const { data } = await axios.put(`users/link/${id}`);
        return data;
    }catch (error) {
        return [null, error.response.data];
    }
}