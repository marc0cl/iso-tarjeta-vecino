import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getForm, getUserById } from '../../services/form.service';

const DetailsForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
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
      } catch (error) {
        console.error('Error fetching form details:', error);
      }
    };

    fetchData();
  }, [id]);

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
          <p>Respuesta: {question.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default DetailsForm;
