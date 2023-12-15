import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBenefit } from "../../services/benefit.service";

const DetailsBenefit = () => {

    const { id } = useParams();

    const [benefit, setBenefit] = useState({});

    useEffect(() => {
        getBenefit(id).then((response) => {
            setBenefit(response);
            console.log(response);
        });
    }, []);

    return (
        <>
        <h1>Detalles del beneficio</h1>
        <p>Nombre: {benefit.name}</p>
        <p>Empresa: {benefit.company}</p>
        <p>Descripción: {benefit.description}</p>
        <p>Descuento: {benefit.discount}</p>
        </>
    );
}

export default DetailsBenefit;