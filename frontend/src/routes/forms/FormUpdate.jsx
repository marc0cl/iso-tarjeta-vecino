import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getForm, getUserById, updateForm, addImageToForm } from '../../services/form.service';

const MySwal = withReactContent(Swal);

const FormUpdate = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [formResponses, setFormResponses] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formDetails = await getForm(id);
        setForm(formDetails);

        if (formDetails.user) {
          const user = await getUserById(formDetails.user);
          setUserDetails(user);
        }

        if (formDetails.image) {
          setImageData(formDetails.image.data.data.toString('base64'));
          setImageLoaded(true);
        }

        const initialResponses = {};
        formDetails.questions.forEach((question) => {
          initialResponses[question._id] = question.answer || '';
        });
        setFormResponses(initialResponses);
      } catch (error) {
        console.error('Error fetching form details:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateForm = async () => {
    try {
      // Si hay una nueva imagen, la subimos antes de actualizar el formulario
      if (image) {
        await addImageToForm(id, image);
      }

      await updateForm(id, {
        title: form.title,
        questions: form.questions.map((question) => ({
          text: question.text,
          answer: formResponses[question._id] || '',
        })),
      });

      MySwal.fire({
        icon: 'success',
        title: 'Formulario actualizado con éxito',
        showConfirmButton: false,
        timer: 2000,
      });

      setFormResponses({});
      console.log('Formulario actualizado con éxito');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error al actualizar el formulario:', error);
    }
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1 style={{ color: 'black' }}>{form.title}</h1>

      {userDetails && (
        <h2 style={{ color: 'red' }}>
          Usuario: {userDetails.firstName} {userDetails.lastName}
        </h2>
      )}

      <h2 style={{ color: 'black' }}>Preguntas:</h2>
      {form.questions?.map((question, index) => (
        <div key={index} style={{ backgroundColor: 'white', padding: '10px',  width: '100%', textAlign: 'center' }}>
          <p style={{ color: 'black', fontWeight: 'bold' }}>Pregunta {index + 1}: {question.text}</p>
          <input
            type="text"
            
            onChange={(e) => {
              setFormResponses({
                ...formResponses,
                [question._id]: e.target.value,
              });
            }}
          />
        </div>
      ))}

      {/* Campo para subir la imagen */}
      <div>
        <h2 style={{ color: 'red' }}>Sube un documento que acredite tu domicilio, ej: boleta de luz:</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      {imageLoaded && (
        <div>
          <h2 style={{ color: 'red' }}>Imagen Actual:</h2>
          <img width="300" height="300" src={`data:${form.image.contentType};base64,${imageData}`} alt="Imagen del formulario" />
        </div>
      )}

      <button onClick={handleUpdateForm}>Enviar Formulario</button>
    </div>
  );
};

export default FormUpdate;
