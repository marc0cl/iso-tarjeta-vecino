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

export const getUserInfo = async () => {
    try {
      const response = await axios.get('/api/user-info'); // Ruta correspondiente a tu backend
      return response.data;
    } catch (error) {
      console.error('Error en getUserInfo:', error);
      throw error;
    }
  };