import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getForm, getUserById } from '../../services/form.service';

const DetailsForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

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

      
    const imageUrl = formDetails.image.data.data;
    const arrayBuffer = new Uint8Array(imageUrl).buffer;
    const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
    console.log(base64String);
      //setImageUrl(imageUrl);
      setImageLoaded(true);
    } catch (error) {
      console.error('Error fetching form details:', error);
    }
  };

  useEffect(() => {
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

      {/* Mostramos la imagen si existe */}
      <div>
        <h2>Imagen:</h2>
        
          <img
            src={imageUrl}
            alt="Imagen del formulario"
          />
        
      </div>

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
