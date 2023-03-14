import { useNavigate } from "react-router-dom";

function HomePage()
{
    const navigate = useNavigate();

    function navigateHandler()
    {
        navigate("products");
    }

    return (
        <>
            <div>My Home Page</div>
            <button onClick={ navigateHandler }>Navigate</button>
        </>
    )
}

export { HomePage };