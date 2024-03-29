import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
    {
        id: 1,
        title: "Event #1"
    },
    {
        id: 2,
        title: "Event #2"
    }
]

function EventsPage()
{
    return (
        <>
            <h1>Events Page</h1>
            <ul>
                {
                    DUMMY_EVENTS.map(event =>
                    {
                        return (
                            <li key={ event.id }>
                                <Link to={ event.id.toString() }>{ event.title }</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export { EventsPage };
