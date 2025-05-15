'use client'
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import VideoAgent with SSR disabled
const VideoAgent = dynamic(() => import('@/components/VideoAgent/VdoAgent2'), { ssr: false });

export default function VideoAgentPage() {
    const [showAgent, setShowAgent] = useState(true);

    return (
        <div className="relative h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-center mt-8">Welcome to the Video Agent Page</h1>

            {showAgent && <VideoAgent onClose={() => setShowAgent(false)} />}

            {!showAgent && (
                <button
                    onClick={() => setShowAgent(true)}
                    className="mt-4 mx-auto block px-4 py-2 bg-blue-600 text-white rounded shadow"
                >
                    Launch Agent Again
                </button>
            )}
        </div>
    );
}
