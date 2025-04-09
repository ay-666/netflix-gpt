import React from 'react'
import Login from '../components/Login'
import Browse from '../components/Browse'
import SignUp from '../components/SignUp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Body from '../components/Body'

const AppRouter = () => {
    const appRouter = createBrowserRouter([
        {
            path:'/',
            element: <Body />,
            children:[
                {
                    path: "/",
                    element: <Login />
        
                },
                {
                    path: "/browse",
                    element: <Browse />
        
                },
                {
                    path: "/signup",
                    element: <SignUp />
                }
            ]
        }
    ])
    return (
        <RouterProvider router={appRouter}>
        </RouterProvider>
    )
}

export default AppRouter;