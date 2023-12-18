import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getForm, getUserById, updateForm } from '../../services/form.service';

const DetailsForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [base64String, setbase64String] = useState(null);
  const [formResponses, setFormResponses] = useState({});

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

      
      if (formDetails.image && formDetails.image.data && formDetails.image.data.data) {
        const imageUrl = formDetails.image.data.data;
        const arrayBuffer = new Uint8Array(imageUrl).buffer;
        const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
        setbase64String(base64String);
        // setImageUrl(imageUrl);
        // setImageLoaded(true);
      } else {
        console.warn('El formulario no tiene una imagen asociada.');
      }

      
    } catch (error) {
      console.error('Error fetching form details:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleUpdateForm = async (newEstado) => {
    try {
      
      console.log("Data to send:", { title: form.title, estado: newEstado});

      await updateForm(id, {
        
        estado: newEstado
      
      });

      

      setFormResponses({});
      console.log('Formulario actualizado con éxito');
      
    } catch (error) {
      console.error('Error al actualizar el formulario:', error);
    }
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
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
      <div>
        <h2>Imagen:</h2>
        
        <img alt="Imagen del formulario" src={`data:image/png;base64,${base64String}`}/>

        
      </div>
      {/* Botones de Aprobar y Rechazar */}
      <div style={{ marginTop: '20px' }}>
                <button onClick={() => handleUpdateForm(1)}>Aprobar</button>
                <button onClick={() => handleUpdateForm(0)}>Rechazar</button>
            </div>
    </div>
  );
};

export default DetailsForm;
