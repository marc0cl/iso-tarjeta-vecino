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

  export const getUserByEmail = async (email) => {
    try {
      const response = await axios.get(`/users/mail/${email}`); // Adjust the route based on your backend
      return response.data;
    } catch (error) {
      console.error('Error in getUserByEmail:', error);
      throw error;
    }
  };