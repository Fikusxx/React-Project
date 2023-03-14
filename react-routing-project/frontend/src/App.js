import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "./pages/RootLayout";
import { HomePage } from "./pages/HomePage";
import { EventsPage, eventsLoader } from "./pages/Events"
import { EventDetailsPage, eventDetailsLoader, deleteEvent } from "./pages/EventDetailsPage"
import { NewEventPage } from "./pages/NewEventPage"
import { EditEventPage } from "./pages/EditEventPage"
import { EventsRootLayout } from "./pages/EventsRootLayout"
import { ErrorPage } from "./pages/ErrorPage"
import { newEventAction } from "./components/EventForm"
import NewsletterPage from "./pages/Newsletter";
import { action as newsletterAction } from "./pages/Newsletter"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          { index: true, element: <EventsPage />, loader: eventsLoader },
          {
            path: ":id", id: "event-detail", loader: eventDetailsLoader, children: [
              { index: true, element: <EventDetailsPage />, action: deleteEvent, },
              { path: "edit", element: <EditEventPage />, action: newEventAction }
            ]
          },
          { path: "new", element: <NewEventPage />, action: newEventAction },
        ]
      },
      { path: "newsletter", element: <NewsletterPage />, action: newsletterAction }
    ]
  }
])


function App()
{
  return (
    <RouterProvider router={ router } />
  )
}

export default App;
