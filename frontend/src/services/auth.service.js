import axios from './root.service';
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";  // Importa la librería con mayúscula para evitar conflictos de nombres

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post('auth/login', {
      email,
      password,
    });
    const { status, data } = response;
    console.log(response);
    if (status === 200) {
      const { accessToken } = data.data;
      const { email, roles } = jwtDecode(accessToken);
      localStorage.setItem('user', JSON.stringify({ email, roles }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // Usa directamente Cookies.set sin new
      Cookies.set('jwt-auth', accessToken, { path: '/' });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  // Usa directamente Cookies.remove
  Cookies.remove('jwt-auth', { path: '/' }); // Asegúrate de proveer el mismo path que al setear la cookie
};

export const test = async () => {
  try {
    const response = await axios.get('/users');
    const { status, data } = response;
    if (status === 200) {
      console.log(data.data);
    }
  } catch (error) {
    console.error(error);
  }
};
