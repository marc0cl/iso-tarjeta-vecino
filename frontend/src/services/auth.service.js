import axios from './root.service';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

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

      const cookies = new Cookies();
      cookies.set('jwt-auth', accessToken, { path: '/' });
    }
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  cookies.remove('jwt');
  cookies.remove('jwt-auth');
};

export const test = async () => {
  try {
    const response = await axios.get('/users');
    const { status, data } = response;
    if (status === 200) {
      console.log(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};
