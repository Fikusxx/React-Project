import { json, redirect, useRouteLoaderData } from "react-router-dom"
import { EventItem } from "../components/EventItem"

async function eventDetailsLoader({ request, params })
{
    const id = params.id;
    const response = await fetch("http://localhost:8080/events/" + id);

    if (response.ok === false)
    {
        throw json({ message: "Could not fetch event with id: " + id }, { status: 500 });
    }

    return response;
}

async function deleteEvent({ request, params })
{
    const id = params.id;
    const response = await fetch("http://localhost:8080/events/" + id, {
        method: request.method
    });

    if (response.ok === false)
    {
        throw json({ message: "Could not delete event with id: " + id }, { status: 500 });
    }

    return redirect("/events");
}

function EventDetailsPage()
{
    const data = useRouteLoaderData("event-detail");

    return (
        <EventItem event={ data.event } />
    )
}

export { EventDetailsPage, eventDetailsLoader, deleteEvent };
