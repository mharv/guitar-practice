import React, { useEffect, useState } from 'react';

const guitarStringNumberLookup: { [key: string]: number } = {
    'E': 6,
    'A': 5,
    'D': 4,
    'G': 3,
    'B': 2,
    'e': 1
};

function LearningFretboard() {
    const generateRandomString = () => {
        const strings = ['E', 'A', 'D', 'G', 'B', 'e'];
        const randomString = strings[Math.floor(Math.random() * strings.length)];
        return randomString;
    }


    const [notePool, setNotePool] = useState<string[]>(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    const toggleNotePool = () => {
        console.log(notePool.length);
        if (notePool.length === 12) {
            setNotePool(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
        } else {
            setNotePool(['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']);
        }
        // call this after to recreate the altered note set
        generateRandomNoteSet();
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
        const randomNote = notePool[Math.floor(Math.random() * notePool.length)];
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
        while (noteSet.size < notePool.length) {
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

    const [showStringNumberOnly, setShowStringNumberOnly] = useState<boolean>(true);

    useEffect(() => {
        getRandomStringSet();
        generateRandomNoteSet();
    }, []);

    return (
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
                <button className="bg-metal px-6 py-2 ml-5 mb-5 text-white rounded-full" onClick={toggleNotePool} >toggle sharps/flats</button>
            </div>
            <div className={`grid grid-cols-12 gap-4`}>
                {noteSet && noteSet.map((note) => {
                    return <p className="text-5xl font-bold"><span key={note}>{"  " + note + "  "}</span></p>
                })}
            </div>
        </div>
    );

}

export default LearningFretboard;
