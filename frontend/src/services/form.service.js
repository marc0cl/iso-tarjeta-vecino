import axios from './root.service';

export const getForms = async () => {
    try {
        const { data } = await axios.get('/forms');
        return data.data;
    } catch (error) {
        return [null, error.response.data];
    }
};

// form.service.js
export const getForm = async (id) => {
    try {
        const { data } = await axios.get(`/forms/${id}`);
        return data.data;  
    } catch (error) {
        return [null, error.response.data];
    }
};


export const createForm = async (form) => {
    try {
        const { data } = await axios.post('/forms', form);
        return data;
    } catch (error) {
        return [null, error.response.data];
    }
};

export const updateForm = async (id, form) => {
    try {
        const { data } = await axios.put(`/forms/${id}`, form);
        return data;
    } catch (error) {
        return [null, error.response.data];
    }
};

export const deleteForm = async (id) => {
    try {
        const { data } = await axios.delete(`/forms/${id}`);
        return data;
    } catch (error) {
        return [null, error.response.data];
    }
};

export const getUserById = async (userId) => {
  try {
    const { data } = await axios.get(`/users/id/${userId}`);
    return data.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const addImageToForm = async (formId, image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);

        const { data } = await axios.post(`/forms/${formId}/add-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return data;
    } catch (error) {
        return [null, error.response.data];
    }
};


