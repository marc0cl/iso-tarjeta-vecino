import axios from './root.service';

export const getUsers = async () => {
    try {
        const { data } = await axios.get(`users/`);
        return data.data;
    }catch (error) {
        return [null, error.response.data];
    }
}

export const linkBenefitToUser = async (id) => {
    try {
        const { data } = await axios.put(`users/link/${id}`);
        return data;
    }catch (error) {
        return [null, error.response.data];
    }
}

export const getUserByEmail = async (email) => {
    try {
        const response = await axios.get(`/users/mail/${email}`);
        return response.data;
    } catch (error) {
        console.error('Error in getUserByEmail:', error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const { data } = await axios.post('users/', userData);
        return [data, null];
    } catch (error) {
        console.error("Error creating user:", error);
        return [null, error.response ? error.response.data : error];
    }
};
