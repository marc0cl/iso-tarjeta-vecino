import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getForm, getUserById, updateForm } from '../../services/form.service';

const MySwal = withReactContent(Swal);

const FormUpdate = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [imageData, setImageData] = useState(null); 
  const [imageLoaded, setImageLoaded] = useState(false);
  const [formResponses, setFormResponses] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    console.log('ID del formulario:', id);
    const fetchData = async () => {
      try {
        const formDetails = await getForm(id);
        setForm(formDetails);

        // Verificamos si hay un usuario asociado al formulario
        if (formDetails.user) {
          // Obtenemos los detalles del usuario
          const user = await getUserById(formDetails.user);
          setUserDetails(user);
        }
        if (formDetails.image) {
          setForm(formDetails);
        }

        setImageData(imageData);
        console.log('Cadena Base64 de la imagen:', formDetails.image.data);
        const imageData = formDetails.image.data.data.toString('base64');
        setImageLoaded(true);

        // Inicializamos las respuestas del formulario con las respuestas actuales
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

  // Función para manejar la actualización de respuestas
  const handleUpdateForm = async () => {
    try {
      // Enviar las respuestas actualizadas al backend
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
        timer: 2000, // Ajusta el tiempo de espera según tus preferencias
      });
      // Puedes realizar acciones adicionales después de la actualización si es necesario
      setFormResponses({});
      console.log('Formulario actualizado con éxito');
      setTimeout(() => {
        navigate('/');
      }, 2000); // Ajusta el tiempo de espera según tus preferencias
    } catch (error) {
      console.error('Error al actualizar el formulario:', error);
      // Puedes manejar el error de alguna manera
    }
  };

  return (
    <div>
      <h1>{form.title}</h1>

      {/* Verificamos si hay detalles del usuario antes de mostrar el nombre y apellido */}
      {userDetails && (
        <h2>
          Usuario: {userDetails.firstName} {userDetails.lastName}
        </h2>
      )}

      <h2>Preguntas:</h2>
      {form.questions?.map((question, index) => (
        <div key={index}>
          <p>Pregunta {index + 1}: {question.text}</p>
          {/* Mostrar cuadro de texto para editar la respuesta */}
          <input
            type="text"
            value={formResponses[question._id] || ''}
            onChange={(e) => {
              setFormResponses({
                ...formResponses,
                [question._id]: e.target.value,
              });
            }}
          />
        </div>
      ))}

      

      {/* Agregar un botón para actualizar el formulario */}
      <button onClick={handleUpdateForm}>Actualizar Formulario</button>
    </div>
  );
};

export default FormUpdate;
