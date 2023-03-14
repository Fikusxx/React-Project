import { PageContent } from "../components/PageContent"
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function ErrorPage()
{
    const error = useRouteError();

    let title = "Error!";
    let message = "Something went wrong... :(";

    if (error)
    {
        // const data = JSON.parse(error.data);
        // console.log(data);
        // message = data.message;
        // console.log(data); // {message: 'Could not fetch events'}

        // if (error.status === 500) title = "Internal server error";
        // if (error.status === 404) title = "Not found!";
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={ title }>
                <p>{ message }</p>
            </PageContent>
        </>
    )
}

export { ErrorPage };