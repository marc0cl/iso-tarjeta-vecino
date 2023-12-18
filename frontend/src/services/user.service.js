import axios from './root.service';

export const getUsers = async () => {
    try {
        const { data } = await axios.get(`users/`);
        console.log(data.data);
        return data.data;
    }catch (error) {
        return [null, error.response.data];
    }
}

export const linkBenefitToUser = async (id) => {
    try {
        const { data } = await axios.put(`users/link/${id}`);
        console.log(data.message);
        return data;
    }catch (error) {
        return [null, error.response.data];
    }
}

export const getUserByEmail = async (email) => {
    try {
        const { data } = await axios.get(`/users/mail/${email}`);
        console.log(data);
        return [data, null];
    } catch (error) {
        console.error("Error fetching user data:", error);
        return [null, error.response ? error.response.data : error];
    }
};
