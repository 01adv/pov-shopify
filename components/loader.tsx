"use client"

import { useEffect, useState } from "react"

export function ProductLoader() {
    const [rotation, setRotation] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation((prev) => (prev + 45) % 360)
        }, 150)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="relative h-16 w-16 mb-8">
                {[...Array(8)].map((_, i) => {
                    const angle = i * 45
                    // const delay = i * 0.125
                    const opacity = rotation === angle ? 1 : 0.3 + 0.7 * (1 - Math.abs(((rotation - angle + 360) % 360) / 180))

                    return (
                        <div
                            key={i}
                            className="absolute h-4 w-4 rounded-full bg-rose-400"
                            style={{
                                top: `${50 - 30 * Math.sin((angle * Math.PI) / 180)}%`,
                                left: `${50 - 30 * Math.cos((angle * Math.PI) / 180)}%`,
                                transform: "translate(-50%, -50%)",
                                opacity,
                            }}
                        />
                    )
                })}
            </div>
            <h3 className="text-lg font-medium text-center">Curating your selection...</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
                We are preparing your personalized outfit recommendations
            </p>
        </div>
    )
}
