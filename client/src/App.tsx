import React, { useEffect, useState } from 'react';

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
        const stringSetArray = Array.from(stringSet);
        setStringSet(stringSetArray as string[]);
    }

    const [stringSet, setStringSet] = useState<string[]>();
    const [noteSet, setNoteSet] = useState<string[]>();

    const generateRandomNote = () => {
        const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        return randomNote;
    }

    const convertSharpNoteToFlat = (note: string) => {
        const sharpToFlatLookup: { [key: string]: string } = {
            'A#': 'Bb',
            'C#': 'Db',
            'D#': 'Eb',
            'F#': 'Gb',
            'G#': 'Ab'
        };
        return sharpToFlatLookup[note];
    }

    const generateRandomNoteSet = () => {
        const noteSet = new Set();
        while (noteSet.size < 12) {
            let randomNote = generateRandomNote();
            if (randomNote.includes('#')) {
                if (Math.random() < 0.5) {
                    randomNote = convertSharpNoteToFlat(randomNote);
                }
            }
            noteSet.add(randomNote);
        }
        // convert the set to an array
        const noteSetArray = Array.from(noteSet);
        setNoteSet(noteSetArray as string[]);
    }

    const [showStringNumberOnly, setShowStringNumberOnly] = useState<boolean>(false);

    useEffect(() => {
        getRandomStringSet();
        generateRandomNoteSet();
        generateRandomTriadExerciseDirection();
    }, []);

    const [randomTriadExerciseDirection, setRandomTriadExerciseDirection] = useState<string>();

    const generateRandomTriadExerciseDirection = () => {
        const directions = ["Up Fretboard", "Down Fretboard", "Across Fretboard From 6th string", "Across Fretboard From 1st string"];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        setRandomTriadExerciseDirection(randomDirection);
    }


    return (
        <div className="App">
            <div className="container mx-auto p-8 m-10">
                <p className="text-3xl text-gray-700 font-bold mb-5">
                    PracGPP - Guitar practice platform
                </p>
                <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
                    <div className="flex items-center">
                        <p className="text-3xl text-gray-700 font-bold mb-5">String order:</p>
                        <button className="bg-midnight px-6 py-2 ml-5 mb-5 text-white rounded-full" onClick={getRandomStringSet} >choose 6 strings at random</button>
                        <button className="bg-midnight px-6 py-2 ml-5 mb-5 text-white rounded-full" onClick={() => setShowStringNumberOnly(!showStringNumberOnly)} >toggle string notes on/off</button>
                    </div>
                    {showStringNumberOnly ?
                        <div className="grid grid-cols-6 gap-4">
                            {stringSet && stringSet.map((guitarString) => {
                                return <p className="text-5xl font-bold " key={guitarString}>{guitarStringNumberLookup[guitarString]}</p>
                            })}
                        </div> :
                        <div className="grid grid-cols-6 gap-4">
                            {stringSet && stringSet.map((guitarString) => {
                                return <p className="text-5xl font-bold " key={guitarString}>{guitarStringNumberLookup[guitarString] + ": " + guitarString}</p>
                            })}
                        </div>}
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="flex items-center">
                        <p className="text-3xl text-gray-700 font-bold mb-5">Notes:</p>
                        <button className="bg-metal px-6 py-2 ml-5 mb-5 text-white rounded-full" onClick={generateRandomNoteSet} >choose 12 notes at random</button>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        {noteSet && noteSet.map((note) => {
                            return <p className="text-5xl font-bold"><span key={note}>{"  " + note + "  "}</span></p>
                        })}
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="flex items-center">
                        <p className="text-3xl text-gray-700 font-bold mb-5">Triad exercise:</p>
                        <button className="bg-bubble-gum px-6 py-2 ml-5 mb-5 text-white rounded-full" onClick={generateRandomTriadExerciseDirection}>choose new exercise</button>
                    </div>
                    <div className="">
                        <p className="text-5xl font-bold">{randomTriadExerciseDirection}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
