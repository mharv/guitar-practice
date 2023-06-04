import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import LearningFretboard from './routes/LearningFretboard';
import NotFound from './routes/NotFound';


function App() {

    return (
        <div className="App">
            <div className="container mx-auto p-8 m-10">
                <p className="text-3xl text-gray-700 font-bold mb-5">
                    PracGPP - Guitar practice platform
                </p>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/LearningFretboard" element={<LearningFretboard />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
