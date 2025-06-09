"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SquareCheck } from "lucide-react"

const faqItems = [
    {
        question: "What is the Shipping Policy?",
        answer:
            "We offer free standard shipping on all orders over $50. Orders under $50 have a flat shipping rate of $5.99. Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout.",
    },
    {
        question: "What shipping providers do you use?",
        answer:
            "We primarily use USPS, FedEx, and UPS for our shipments. The carrier used depends on your location and the shipping method selected at checkout.",
    },
    {
        question: "How do I return an item?",
        answer:
            "To return an item, please go to your account, find the order containing the item you wish to return, and click on 'Return Item'. Follow the instructions to generate a return label. Package your item securely and attach the return label.",
    },
    {
        question: "What is the return policy?",
        answer:
            "We accept returns within 30 days of delivery for items in their original condition with tags attached. Refunds will be issued to the original payment method. Sale items and intimate apparel are final sale and cannot be returned.",
    },
    {
        question: "I am expecting a refund. How long does this take?",
        answer:
            "Once we receive your return, it takes 1-2 business days to process. After processing, refunds typically take 3-5 business days to appear on your statement, depending on your financial institution.",
    },
    {
        question: "Where are your products made?",
        answer:
            "Our products are ethically manufactured in various locations around the world. We partner with factories that meet our strict standards for quality, worker conditions, and environmental practices. Each product page specifies the country of origin.",
    },
    {
        question: "What if I want to speak to someone?",
        answer:
            "Our customer service team is available Monday through Friday, 9am to 5pm EST. You can reach us by phone at (555) 123-4567 or by email at support@example.com.",
    },
]

export default function FaqAccordion() {
    return (
        <div>
            <h2 className="text-4xl mb-8 text-center">Contact Us</h2>
            <Accordion type="single" collapsible className="border-t border-gray-200">
                {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 ">
                        <AccordionTrigger className="flex items-center text-base font-normal hover:no-underline">
                            <div className="flex items-center">
                                <SquareCheck className="h-5 w-5 mr-2 text-gray-500" />
                                <span className="hover:underline hover:underline-offset-2 text-sm">{item.question}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="py-2 px-7 text-gray-600">{item.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
