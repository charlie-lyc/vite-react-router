import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,

} from 'react-router-dom'
import './assets/css/index.css'
import App from './App'
import RootPage, { 
    loader as rootLoader,
    action as rootAction,

} from './pages/rootPage'
import ErrorPage from './pages/errorPage'
import Index from './components/Index'
import Contact, { 
    loader as contactLoader,
    action as contactAction,

} from './components/Contact'
import EditContact, { action as editAction } from './components/EditContact'
import { action as destroyAction } from './components/DestroyContact'

const router = createBrowserRouter([
    {
        path: '/app',
        element: <App />,
    },
    {
        path: '/',
        // element: <div>Home</div>,
        element: <RootPage />,
        loader: rootLoader,
        action: rootAction,
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    { 
                        index: true, 
                        element: <Index /> 
                    },
                    {
                        path: 'contacts/:contactId', // URL Segment
                        element: <Contact />,        // Component <- individual contact data
                        loader: contactLoader,
                        action: contactAction,
                    },
                    {
                        path: 'contacts/:contactId/edit',
                        element: <EditContact />,
                        loader: contactLoader,
                        action: editAction,
                    },
                    {
                        path: 'contacts/:contactId/destroy',
                        element: <></>,
                        action: destroyAction,
                        errorElement: <div>Oops! There was an error in process of deleting.</div>,
                    }
                ],

            },

        ],

    },
    // {
    //     path: '/contacts/:contactId',
    //     element: <Contact />
    // },

])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* <App /> */}
        <RouterProvider router={router} />
    </React.StrictMode>,
)
