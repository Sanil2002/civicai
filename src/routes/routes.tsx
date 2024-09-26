import { Chat } from "@/containers/chat/Chat";
// import ContactList from "@/containers/contactList/contactList";
import ErrorPage from "@/containers/errorPage/errorPage";
import Layout from "@/containers/layout/layout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Chat />
      }
    ],
  },
]);


