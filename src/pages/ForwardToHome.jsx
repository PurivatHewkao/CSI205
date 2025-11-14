import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForwardToHome = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('../home')
    }, [navigate])
    return null
}
 
export default ForwardToHome;