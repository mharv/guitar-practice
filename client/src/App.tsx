import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './routes/Home';
import LearningFretboard from './routes/LearningFretboard';
import LearningTriads from './routes/LearningTriads';
import NotFound from './routes/NotFound';


const routes = [
    {
        path: '/',
        element: <Home />,
        name: 'Home',
    },
    {
        path: '/LearningFretboard',
        element: <LearningFretboard />,
        name: 'Learning Fretboard',
    },
    {
        path: '/LearningTriads',
        element: <LearningTriads />,
        name: 'Learning Triads',
    },
    {
        path: '*',
        element: <NotFound />,
        name: 'Not Found',

    }
];

function App() {

    return (
        <div className="App">
            <div className="container mx-auto p-8 m-10">
                <p className="text-3xl text-gray-700 font-bold mb-5">
                    PracGPP - Guitar practice platform
                </p>
                <Router>
                    <nav>
                        <ul>
                            {routes.map((route, index) => (
                                route.name === 'Not Found' ? null :
                                    <li key={index}>
                                        <NavLink to={route.path} className={({ isActive }) =>
                                            isActive
                                                ? "text-purple bg-bermuda px-6 py-2 ml-5 mb-5 text-white rounded-full"
                                                : "text-black bg-dark-gray px-6 py-2 ml-5 mb-5 rounded-full"
                                        } >{route.name}</NavLink>
                                    </li>
                            ))}
                        </ul>
                    </nav>
                    <Routes>
                        {routes.map((route, index) => (
                            <Route key={index} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
