import axios from './root.service';

export const getBenefits = async () => {
    try {
        const { data } = await axios.get('/benefits');
        return data.data;
    } catch (error) {
        return [null, error.response.data];
    }
};

export const getBenefit = async (id) => {
    try {
        const { data } = await axios.get(`/benefits/${id}`);
        return data.data;
    } catch (error) {
        return [null, error.response.data];
    }
};

export const createBenefit = async (benefit) => {
    try {
        const { data } = await axios.post('/benefits', benefit);
            return data;
    } catch (error) {
        return [null, error.response.data];
    }
};

export const updateBenefit = async (id, benefit) => {
    try {
        const { data } = await axios.put(`/benefits/${id}`, benefit);
        return data;
    } catch (error) {
        return [null, error.response.data];
    }
}

export const deleteBenefit = async (id) => {
    try {
        const { data } = await axios.delete(`/benefits/${id}`);
        return data;
    } catch (error) {
        return [null, error.response.data];
    }
};