import { MainNavigation } from "../components/MainNavigation";

function ErrorPage()
{
    return (
        <>
            <MainNavigation />
            <main>
                <h1>Error occured!</h1>
                <div>Could not find requested page... :(</div>
            </main>
        </>
    )
}

export { ErrorPage };