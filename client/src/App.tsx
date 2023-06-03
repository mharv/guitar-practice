import React, { useState } from 'react';
import './App.css';

const guitarStringNumberLookup: { [key: string]: number } = {
    'E': 6,
    'A': 5,
    'D': 4,
    'G': 3,
    'B': 2,
    'e': 1
};

function App() {
    const generateRandomString = () => {
        const strings = ['E', 'A', 'D', 'G', 'B', 'e'];
        const randomString = strings[Math.floor(Math.random() * strings.length)];
        return randomString;
    }

    const getRandomStringSet = () => {
        const stringSet = new Set();
        while (stringSet.size < 6) {
            stringSet.add(generateRandomString());
        }
        // convert the set to an array
        const stringSetArray = Array.from(stringSet);
        setStringSet(stringSetArray as string[]);
    }

    const [stringSet, setStringSet] = useState<string[]>();

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    GPP - Guitar practice platform
                </p>

                <button onClick={getRandomStringSet} >choose 6 strings at random</button>
                {stringSet && stringSet.map((guitarString) => {
                    return <p key={guitarString}>{guitarStringNumberLookup[guitarString] + ": " + guitarString}</p>
                })}
            </header>
        </div>
    );
}

export default App;
