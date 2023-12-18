import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getForm, getUserById } from '../../services/form.service';

const DetailsForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [imageData, setImageData] = useState(null); 
  const [imageLoaded, setImageLoaded] = useState(false);

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
        if (formDetails.image) {
          setForm(formDetails);
        }

        setImageData(imageData);
        console.log('Cadena Base64 de la imagen:', formDetails.image.data);
        const imageData = formDetails.image.data.data.toString('base64');
        setImageLoaded(true);
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
      {/* Mostramos la imagen si existe */}
      <div>
      <h2>Imagen:</h2>
      {imageLoaded && form.image && (
           <img
           width='300' height='300' 
           src={`data:${form.image.contentType};base64,${form.image.data}`}
           alt="Imagen del formulario"
         />
        
      )}</div>
    </div>
  );
};

export default DetailsForm;
