"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        comment: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log("Form submitted:", formData)
        // Reset form or show success message
    }

    return (
        <div>
            <h1 className="text-[30px] md:text-[45px] my-8">Contact</h1>
            <p className="text-gray-500 mb-16">
                Get in touch! We would love to hear from you. Please give us 24 hours to respond to your question.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="border-gray-600/70 rounded-none h-12"
                    />
                    <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email *"
                        required
                        className="border-gray-600/70 rounded-none h-12"
                    />
                </div>
                <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="border-gray-600/70 rounded-none h-12"
                />
                <Textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Comment"
                    className="border-gray-600/70 rounded-none min-h-[100px]"
                />
                <div>
                    <Button
                        type="submit"
                        variant="outline"
                        className="rounded-none px-8 h-12 border-gray-600/70 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                        Send
                    </Button>
                </div>
            </form>
        </div>
    )
}
