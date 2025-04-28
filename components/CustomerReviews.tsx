"use client"

import { ChevronDown, Star, UserRound } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "./ui/button"

export default function CustomerReviews() {
    const [sortOption, setSortOption] = useState<string>("Highest Rating")

    // Sample review data
    const reviews = [
        {
            id: 1,
            author: "Steph J.",
            rating: 5,
            title: "What is this sorcery!",
            content:
                "I can't believe this jacket. For something that looks so designer and feels perfectly fitted, it also has full sized pockets 😍. And I love the subtle functionality of sleeves staying put when I scrunch them up. In love!",
            date: "02/12/2025",
            verified: true,
            country: "US",
        },
        {
            id: 2,
            author: "Breanna J.",
            rating: 5,
            title: "Tailoring and pockets are perfect!",
            content:
                "I adore this suit- the attention to detail and functionality (interior pockets) are beautiful, and timeless. I have tried other more expensive brands and I will tell you that comparatively, the POV suit is higher quality, more flattering cut, and overall more comfortable than others I evaluated. I did not want the boring and boxy black, navy or grey suit, and this bold color caught my eye.",
            date: "10/10/2024",
            verified: false,
            country: "US",
        },
    ]

    // Rating distribution
    const ratingCounts: Record<number, number> = {
        5: 3,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
    }

    // Calculate average rating
    const totalReviews = Object.values(ratingCounts).reduce((sum, count) => sum + count, 0)
    const weightedSum = Object.entries(ratingCounts).reduce((sum, [rating, count]) => sum + Number(rating) * count, 0)
    const averageRating = totalReviews > 0 ? weightedSum / totalReviews : 0

    return (
        <div className="w-full mx-auto">
            <h2 className="text-2xl text-center mb-3 lg:mb-6 text-muted-foreground">Customer Reviews</h2>

            <div className="max-lg:flex max-lg:justify-center">
                <div className="grid lg:grid-cols-3 gap-4 lg:gap-8 mb-12 w-full bg-orange-100 max-w-md lg:max-w-full">
                    {/* Overall Rating */}
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="flex items-center mb-1 gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className={`w-4 h-4 ${star <= averageRating ? "text-primary fill-primary" : "text-primary fill-white"}`} />
                            ))}
                            <span className="ml-2 text-primary underline underline-offset-0 hover:no-underline hover:text-primary/85">5.00 out of 5</span>
                        </div>
                        <p className="text-muted-foreground gap-2 flex items-center">
                            Based on {totalReviews} reviews
                            {/*
                        <Check className="inline-block w-4 h-4 text-teal-500" /> */}
                            <Image src="/check.svg" alt="Verified" width={16} height={16} className="inline-block w-4 h-4" />
                        </p>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-2 mx-4">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center gap-6">
                                <div className="flex items-center mr-2 gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className={`w-4 h-4 ${star <= rating ? "text-primary fill-primary" : "text-primary fill-white"}`} />
                                    ))}
                                </div>
                                <div className="w-full bg-gray-200 h-4">
                                    <div
                                        className="bg-pink-300 h-4"
                                        style={{
                                            width: totalReviews > 0 ? `${(ratingCounts[rating] / totalReviews) * 100}%` : "0%",
                                        }}
                                    ></div>
                                </div>
                                <span className="text-gray-600 min-w-[20px] text-start">{ratingCounts[rating]}</span>
                            </div>
                        ))}
                        <span className="flex justify-center text-sm text-primary underline underline-offset-0 hover:no-underline hover:text-primary/85 text-center">See all reviews</span>
                    </div>

                    {/* Write Review Button */}
                    <div className="flex justify-center px-12">
                        <Button className="my-5 px-5 h-11 w-full text-white text-sm rounded-none font-bold">Write a review</Button>
                    </div>
                </div>
            </div>

            {/* Sort Options */}
            <div className="mb-8 border-y py-2">
                <button className="flex items-center text-pink-400 hover:text-pink-500" onClick={() => setSortOption(sortOption === "Highest Rating" ? "Lowest Rating" : "Highest Rating")}>
                    {sortOption} <ChevronDown className="ml-1 w-4 h-4" />
                </button>
            </div>

            {/* Reviews List */}
            <div className="">
                {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 py-4">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className={`w-4 h-4 ${star <= review.rating ? "text-primary fill-primary" : "text-primary fill-white"}`} />
                                ))}
                            </div>
                            <span className="text-muted-foreground/50 text-[13px]">{review.date}</span>
                        </div>

                        <div className="flex items-center mb-2.5">
                            <div className="w-9 h-9 bg-muted flex items-center justify-center mr-2">
                                <UserRound className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <div className="flex items-baseline">
                                    <span className=" text-sm text-muted-foreground mr-2">{review.author}</span>
                                    {review.verified && (
                                        <span className="bg-primary text-white text-xs px-[6px] py-1.5 leading-1">Verified</span>
                                    )}
                                </div>
                                {review.country === "US" && (
                                    <div className="">
                                        <span className="inline-block w-5 h-3 bg-blue-600 relative overflow-hidden">
                                            <span
                                                className="absolute inset-0 bg-red-600"
                                                style={{
                                                    backgroundImage:
                                                        "repeating-linear-gradient(to right, transparent, transparent 2px, white 2px, white 4px)",
                                                    backgroundSize: "10px 100%",
                                                    width: "40%",
                                                    height: "50%",
                                                }}
                                            ></span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className=" text-muted-foreground/75 mb-4">
                            <h3 className="text-lg font-semibold  mb-2">{review.title}</h3>
                            <p className=" leading-relaxed">{review.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

