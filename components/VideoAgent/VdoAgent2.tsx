'use client';
import React, { useState, useRef, useEffect } from 'react';
import Daily from '@daily-co/daily-js';
import { Room } from 'livekit-client';
import { ProductLoader } from '../loader';

const funMessages = [
    'Summoning your virtual assistant...',
    'Loading some cool AI magic...',
    'Warming up the circuits...',
    'Almost there, hang tight...',
    'Assembling the digital charisma...',
];

export default function VideoAgent({ onClose, onLoaded }: { onClose?: () => void, onLoaded?: () => void }) {
    const [avatarID] = useState('June_HR_public');
    const [voiceID] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
    const [isMicOn, setIsMicOn] = useState(true);
    const [transcript, setTranscript] = useState('');

    const videoRef = useRef<HTMLVideoElement>(null);
    const initialized = useRef(false);

    const API_CONFIG = {
        apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
        serverUrl: process.env.NEXT_PUBLIC_SERVER_URL || '',
    };

    const session = useRef<any>({});
    const mediaStream = useRef(new MediaStream());
    const room = useRef<Room | null>(null);
    const webSocket = useRef<WebSocket | null>(null);
    const dailyCall = useRef<any>(null);

    const updateStatus = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setStatus((prev) => `${prev}[${timestamp}] ${message}\n`);
    };

    const getSessionToken = async () => {
        const res = await fetch(`${API_CONFIG.serverUrl}/v1/streaming.create_token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': API_CONFIG.apiKey,
            },
        });
        const data = await res.json();
        session.current.token = data.data.token;
        updateStatus('Session token obtained');
    };

    const connectWebSocket = async (sessionId: string) => {
        const params = new URLSearchParams({
            session_id: sessionId,
            session_token: session.current.token,
            silence_response: 'false',
            opening_text: 'Hello, how can I help you?',
            stt_language: 'en',
        });

        const wsUrl = `wss://${new URL(API_CONFIG.serverUrl).hostname}/v1/ws/streaming.chat?${params}`;
        webSocket.current = new WebSocket(wsUrl);

        // webSocket.current.addEventListener('message', (event) => {
        //     const eventData = JSON.parse(event.data);
        //     console.log('WebSocket message:', eventData);
        // });
        webSocket.current.addEventListener('message', (event) => {
            console.log('[WebSocket Message]', event.data);
            try {
                const data = JSON.parse(event.data);

                if (data.type === 'llm_response' && data.text) {
                    console.log('[LLM Response Detected]', data.text);
                    setTranscript((prev) => `${prev}\nLLM: ${data.text}`);
                }
                if (data.text) {
                    console.log('[Transcript Detected]', data.text, 'Final:', data.is_final);
                    setTranscript((prev) =>
                        data.is_final ? `${data.text}\n` : `${data.text}...`
                    );
                }
            } catch (err) {
                console.error('Error parsing WebSocket message:', err);
            }
        });
    };

    const createNewSession = async () => {
        if (!session.current.token) await getSessionToken();
        console.log('Creating new session with payload:', {
            quality: 'high',
            avatar_name: avatarID,
            voice: { voice_id: voiceID, rate: 1.0 },
            version: 'v2',
            video_encoding: 'H264',
        });


        const res = await fetch(`${API_CONFIG.serverUrl}/v1/streaming.new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.current.token}`,
            },
            body: JSON.stringify({
                quality: 'high',
                avatar_name: avatarID,
                voice: { voice_id: voiceID, rate: 1.0 },
                version: 'v2',
                video_encoding: 'H264',
            }),
        });

        const data = await res.json();
        if (!res.ok) {
            console.error('streaming.new failed:', res.status, data);
            throw new Error(data?.message || 'Failed to create streaming session');
        }
        session.current.info = data.data;
        updateStatus('Session created');

        room.current = new Room({ adaptiveStream: true, dynacast: true });

        room.current.on('trackSubscribed', (track) => {
            mediaStream.current.addTrack(track.mediaStreamTrack);
            if (
                mediaStream.current.getVideoTracks().length > 0 &&
                mediaStream.current.getAudioTracks().length > 0 &&
                videoRef.current
            ) {
                videoRef.current.srcObject = mediaStream.current;
                updateStatus('Media stream ready');
                setLoading(false);
                if (onLoaded) onLoaded();
            }
        });

        room.current.on('trackUnsubscribed', (track) => {
            mediaStream.current.removeTrack(track.mediaStreamTrack);
        });

        room.current.on('disconnected', (reason) => {
            updateStatus(`Room disconnected: ${reason}`);
        });

        await room.current.prepareConnection(data.data.url, data.data.access_token);
        await connectWebSocket(data.data.session_id);
    };

    const startStreaming = async () => {
        await fetch(`${API_CONFIG.serverUrl}/v1/streaming.start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.current.token}`,
            },
            body: JSON.stringify({ session_id: session.current.info.session_id }),
        });

        await room.current?.connect(session.current.info.url, session.current.info.access_token);
        updateStatus('Streaming started');
    };

    const startAudioStream = () => {
        if (!session.current.info) return updateStatus('Cannot start audio: No session info');

        dailyCall.current = Daily.createCallObject();
        dailyCall.current.join({ url: 'https://pivots.daily.co/room-shreyas' });

        const pipecatParams = new URLSearchParams({
            session_id: session.current.info.session_id,
            session_token: session.current.info.access_token,
            realtime_endpoint: session.current.info.realtime_endpoint,
        });

        const socket = new WebSocket(`wss://videoagentbaseline-t3jk.onrender.com/user-audio-input?${pipecatParams}`);

        socket.addEventListener('open', () => {
            console.log('Audio WebSocket connection established');
            updateStatus('Audio stream started');
        });
        const productList = [
            "Hydration Serum",
            "Glow Boost",
            "Rejuvenating Eye Cream",
            "Daily Moisturizer",
            "Exfoliating Scrub",
            "Refreshing Facial Toner",
            "Nourishing Shampoo",
            "Jade Roller",
            "Clarifying Shampoo",
            "Brightening Toner",
            "Herbal Shampoo",
            "Gentle Hair Mask",
            "Herbal Body Wash",
            "Repairing Night Cream",
            "Vitamin C Serum"
        ];

        socket.addEventListener('message', (event) => {
            console.log('[Audio WS Message]', event.data);

            try {
                const data = JSON.parse(event.data);

                if (data.content) {
                    console.log('[Transcript]', data.content);

                    const cleanedText = data.content.trim().replace(/\s+/g, ' ').replace(/[^\w\s]/g, '');

                    console.log('[Cleaned Transcript]', cleanedText);

                    setTranscript((prev) =>
                        data.is_final ? `${cleanedText}\n` : `${cleanedText}...`
                    );

                    productList.forEach(product => {
                        const productRegex = new RegExp(`\\b${product}\\b`, 'i');

                        if (productRegex.test(cleanedText)) {
                            console.log(`[Product Detected]`, product);
                            //   const productDetails = getProductDetails(product);
                            //   setProductRecommendations((prev) => [...prev, productDetails]);
                            //   setProductNotClicked(true); // Reset the flag for unclicked product
                        }
                    });
                }
            } catch (err) {
                console.error('Error parsing audio WebSocket message:', err);
            }
        });

        return socket;
    };

    const closeSession = async () => {
        if (!session.current.info) {
            updateStatus('No active session');
            return;
        }

        try {
            await fetch(`${API_CONFIG.serverUrl}/v1/streaming.stop`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.current.token}`,
                },
                body: JSON.stringify({ session_id: session.current.info.session_id }),
            });

            updateStatus('Streaming stopped');
        } catch (err) {
            console.error('Failed to stop streaming:', err);
        }

        // Clean up Daily (audio)
        try {
            if (dailyCall.current) {
                await dailyCall.current.leave();
                await dailyCall.current.destroy();
                dailyCall.current = null;
                updateStatus('Daily audio session ended');
            }
        } catch (err) {
            console.error('Error cleaning up Daily call:', err);
        }

        // Clean up LiveKit
        webSocket.current?.close();
        room.current?.disconnect();

        // Clean up video
        if (videoRef.current) videoRef.current.srcObject = null;
        mediaStream.current = new MediaStream();

        // Reset session
        session.current = {};
        setLoading(true);
        updateStatus('Session fully closed');
    };

    const toggleMic = async () => {
        try {
            if (isMicOn) {
                await dailyCall.current?.setLocalAudio(false);
                updateStatus('Mic turned off');
            } else {
                await dailyCall.current?.setLocalAudio(true);
                updateStatus('Mic turned on');
            }
            setIsMicOn((prev) => !prev);
        } catch (error) {
            console.error("Mic toggle error:", error);
        }
    };

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const interval = setInterval(() => {
            setLoadingMsgIndex((prev) => (prev + 1) % funMessages.length);
        }, 2500);

        const initialize = async () => {
            await createNewSession();
            await startStreaming();
            startAudioStream();
        };

        initialize();

        return () => clearInterval(interval);
    }, []);

    console.log('transcript', transcript);

    return (
        <div className=" w-full h-full rounded-md md:rounded-xl shadow-lg flex flex-col items-center z-50 relative bg-purple-200">
            {loading && (
                <div className="bg-orange-100 rounded-xl z-20 flex items-center justify-center absolute inset-0 h-full w-full">
                    <ProductLoader className="text-sm" title={funMessages[loadingMsgIndex]} description="" />
                    {/* <p className='text-xs text-center    md:text-sm'>Summoning your virtual assistant...</p> */}
                </div>
            )}

            <video
                ref={videoRef}
                className="w-full h-full rounded-md shadow-lg object-cover"
                autoPlay
                playsInline
                aria-label="Video feed"
            />

            <button
                onClick={async () => {
                    await closeSession();
                    if (onClose) onClose();
                }}
                className="absolute top-2 right-2 bg-gray-100 text-gray-800 px-1.5 py-0.5 text-xs rounded-full shadow-md hover:bg-gray-200 transition z-20"
            >
                ✕
            </button>

            <button
                onClick={toggleMic}
                className="absolute bottom-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full shadow-md hover:bg-primary/90 transition"
            >
                {isMicOn ? "⏸ Stop" : "▶ Start"}
            </button>
        </div>
    );

}
