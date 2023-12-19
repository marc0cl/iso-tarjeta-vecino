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
        console.error("Error fetching user data:", error);
        return [null, error.response ? error.response.data : error];
    }
};
