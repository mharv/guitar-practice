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

    useEffect(() => {
        getRandomStringSet();
        generateRandomNoteSet();
        generateRandomTriadExerciseDirection();
    }, []);

    const [randomTriadExerciseDirection, setRandomTriadExerciseDirection] = useState<string>();

    const generateRandomTriadExerciseDirection = () => {
        // reqiure an origin e.g. 654 strings first for Up and Down Fretboard and inversion
        // require an origin e.g. 1st or 12th fret for Across Fretboard
        const directions = [
            "Up Fretboard",
            "Down Fretboard",
            "Across Fretboard From 6th string",
            "Across Fretboard From 1st string",
            "Triad, 1st Inversion, 2nd Inversion",
        ];
        let randomDirection = directions[Math.floor(Math.random() * directions.length)];
        while (randomDirection === randomTriadExerciseDirection) {
            randomDirection = directions[Math.floor(Math.random() * directions.length)];
        }
        setRandomTriadExerciseDirection(randomDirection);
    }

    return (
        <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
            <div className="flex items-center">
                <p className="text-3xl text-gray-700 font-bold mb-5">as you are moving through the exercises, play the root, followed by the rest of the chord, or vis-a-vis</p>
            </div>
            <div className="flex items-center">
                <p className="text-3xl text-gray-700 font-bold mb-5">pick two notes at random and a direction, alternate between these while playing triads in the direciton</p>
            </div>
            <div className="flex items-center">
                <p className="text-3xl text-gray-700 font-bold mb-5">have a turn off sharps and flats option</p>
            </div>
            <div className="flex items-center">
                <p className="text-3xl text-gray-700 font-bold mb-5">Play triad with root note X on bottom 3 strings and play triad with root note Y on top three strings in similar hand position</p>
            </div>
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
    );

}

export default LearningFretboard;
