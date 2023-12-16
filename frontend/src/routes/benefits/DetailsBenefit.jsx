import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBenefit } from "../../services/benefit.service";
import { Button } from "@mui/material";
import Swal from 'sweetalert2';
import WithReactContent from 'sweetalert2-react-content';
import { linkBenefitToUser } from "../../services/user.service";

const DetailsBenefit = () => {

    const { id } = useParams();

    const [benefit, setBenefit] = useState({});

    useEffect(() => {
        getBenefit(id).then((response) => {
            setBenefit(response);
            console.log(response);
        });
    }, []);

    const MySwal = WithReactContent(Swal);

    function handleLinkAccount(id) {
        MySwal.fire({
            title: "Quieres vincular este beneficio a tu cuenta?",
            text: "Puedes vincular hasta 5 beneficios a tu cuenta al mismo tiempo",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, vincularlo"
        }).then((result) => {
            if (result.isConfirmed) {
                linkBenefitToUser(id).then((response) => {
                    if (response === 200) {
                        MySwal.fire({
                            title: "Beneficio vinculado",
                            icon: "success",
                        });
                    }
                    else {
                        MySwal.fire({
                            title: "No se pudo vincular el beneficio",
                            icon: "error",
                        });
                    }
                });
            }
        });
    }


    return (
        <>
        <h1>Detalles del beneficio</h1>
        <p>Nombre: {benefit.name}</p>
        <p>Empresa: {benefit.company}</p>
        <p>Descripción: {benefit.description}</p>
        <p>Descuento: {benefit.discount}</p>

        <Button onClick={()=>{handleLinkAccount(benefit._id)}} variant="contained">Vincular a cuenta</Button>
        </>
    );
}

export default DetailsBenefit;