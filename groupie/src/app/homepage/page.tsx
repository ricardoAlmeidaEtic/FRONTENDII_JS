'use client';

import { useState } from 'react';
import MusicPlayer from "@/components/MusicPlayer";

type Track = {
id: string;
title: string;
artist: string;
duration: string;
image: string;
};

const Page = () => {
    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

    // Sample tracks data
    const tracks: Track[] = [
        {
            id: '1',
            title: 'Bohemian Rhapsody',
            artist: 'Queen',
            duration: '5:55',
            image: '/queen.jpg'
        },
        {
            id: '2',
            title: 'Hotel California',
            artist: 'Eagles',
            duration: '6:30',
            image: '/eagles.jpg'
        },
        {
            id: '3',
            title: 'Sweet Child O Mine',
            artist: 'Guns N Roses',
            duration: '5:56',
            image: '/guns.jpg'
        },
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-white">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-8">
            <h1 className="text-3xl font-bold">Good Morning</h1>
            <p className="text-gray-400">Recent plays</p>
            </header>

            {/* Tracks Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tracks.map((track) => (
                <div
                key={track.id}
                onClick={() => setSelectedTrack(track)}
                className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition cursor-pointer group"
                >
                <div className="relative mb-4">
                    <img
                    src={track.image}
                    alt={track.title}
                    className="w-full aspect-square object-cover rounded-lg"
                    />
                    <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-6 h-6 ml-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                    </button>
                </div>
                <h3 className="font-semibold truncate">{track.title}</h3>
                <p className="text-gray-400 text-sm">{track.artist}</p>
                </div>
            ))}
            </div>
        </div>

            {/* Music Player (Conditional Render) */}
            
            {selectedTrack && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-slate-800/95 rounded-xl p-8 w-full max-w-2xl mx-4 shadow-xl">
                <MusicPlayer
                    trackName={selectedTrack.title}
                    artistName={selectedTrack.artist}
                    onClose={() => setSelectedTrack(null)}
                />
                </div>
            </div>
            )}
        </div>
    );
};

export default Page;