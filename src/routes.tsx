/**********************************************************************************************************************
 ***********  This is the preconfiguration of routes, so it defines routes and components
 *********************************************************************************************************************/

import React from 'react';

const Login = React.lazy(()=>import("./pages/Login/Login"));
const Register = React.lazy(()=>import("./pages/Register/Register"));
const Datatable= React.lazy(()=>import("./components/Datatable"));
const Language= React.lazy(()=>import("./pages/Language"));
const Dictionary = React.lazy(()=>import("./pages/Dictionary"));

const routes = [
    {path: "/login", id: "Login", element: Login},
    {path: "/register", id: "Register", element: Register},
    {path: "/language", id: "Language", element: Language},
    {path: "/dictionary", id: "Dictionary", element: Dictionary},
    {path: "*", id: "Datatable", element: Datatable},
]

export default routes;