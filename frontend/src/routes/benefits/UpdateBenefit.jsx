import { useParams } from "react-router-dom";
import BenefitUpdateForm from "../../components/BenefitUpdateForm";

const UpdateBenefit = () => {
    
        const { id } = useParams();
        console.log(id);
    
        return (
            <BenefitUpdateForm id={id} />
        );
    }

export default UpdateBenefit;