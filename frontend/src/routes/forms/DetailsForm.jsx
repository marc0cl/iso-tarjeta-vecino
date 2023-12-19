import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getForm, getUserById, updateForm } from '../../services/form.service';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const DetailsForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [base64String, setBase64String] = useState(null);
  const [formResponses, setFormResponses] = useState({});
  const [buttonOpacity, setButtonOpacity] = useState({
    aprobar: 1,
    rechazar: 1,
  });
  const navigate = useNavigate();

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
        setBase64String(base64String);
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
      console.log("Data to send:", { title: form.title, estado: newEstado });

      await updateForm(id, {
        estado: newEstado,
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
        navigate('/forms');
      }, 2000);
    } catch (error) {
      console.error('Error al actualizar el formulario:', error);
    }
  };

  const handleButtonOpacity = (button) => {
    setButtonOpacity((prevOpacity) => ({
      ...prevOpacity,
      [button]: 0.5, // Establecer la opacidad al hacer clic
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1 style={{ color: 'black' }}>{form.title}</h1>

      {/* Verificamos si hay detalles del usuario antes de mostrar el nombre y apellido */}
      {userDetails && (
        <h2 style={{ color: 'black' }}>
          Nombre: {userDetails.firstName} {userDetails.lastName}
        </h2>
      )}

      <h2 style={{ color: 'red' }}>Preguntas:</h2>
      {form.questions?.map((question, index) => (
        <div key={index} style={{ backgroundColor: 'white', padding: '10px', width: '100%', textAlign: 'center' }}>
          <p style={{ color: 'black', fontWeight: 'bold' }}>Pregunta {index + 1}: {question.text}</p>
          <p style={{ color: 'black', fontWeight: 'bold' }}>Respuesta: {question.answer}</p>
        </div>
      ))}
      <div>
        <h2 style={{ color: 'red' }}>Documento presentado:</h2>
        <img alt="Imagen del formulario" src={`data:image/png;base64,${base64String}`} />
      </div>
      {/* Botones de Aprobar y Rechazar */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => {
            handleUpdateForm(1);
            handleButtonOpacity('aprobar');
          }}
          style={{
            marginRight: '50px',
            backgroundColor: 'green',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            opacity: buttonOpacity.aprobar,
          }}
        >
          Aprobar
        </button>
        <button
          onClick={() => {
            handleUpdateForm(0);
            handleButtonOpacity('rechazar');
          }}
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            opacity: buttonOpacity.rechazar,
          }}
        >
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default DetailsForm;
