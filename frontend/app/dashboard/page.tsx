"use client"
import React, { useState } from "react";
import { Home, Bot, Settings, Search, Library, Plus, Mic, SendHorizontal } from "lucide-react";
type Message = {
    role: "user" | "assistant";
    content: string;
};


const Page = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;
        //first set usermessge
        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("text", input);
            // Call your backend API that talks to Gemini
            const res = await fetch("http://127.0.0.1:8000/analyze", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            // Add assistant response
            const botMessage: Message = { role: "assistant", content: data.answer };
            console.log(data.answer);
            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, { role: "assistant", content: "Something Went wrong" },]);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="flex-1 overflow-y-auto w-full max-w-3xl px-2 scroll-smooth scrollbar-hide">
                <div className="max-w-3xl mx-auto space-y-4 py-8">

                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`px-4 py-2 rounded-2xl max-w-[75%] ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100"}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="px-4 py-2 rounded-2xl bg-gray-800 text-gray-300">
                                Typing...
                            </div>
                        </div>
                    )}

                </div>
            </div>
            {/* The Input */}
            <div className="flex justify-center w-8/10 h-12 mb-8 mt-4 ">
                <div className="flex items-center w-full max-w-xl bg-white/10 rounded-full p-2 shadow border-gray-500 border">
                    <Plus className="ml-3 text-white/90 cursor-pointer" size={20} />
                    <input
                        type="text"
                        placeholder="Ask anything"
                        className="flex-1 bg-transparent px-3 outline-none text-white/90"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <SendHorizontal
                        className="mr-3 text-white/90 cursor-pointer"
                        size={20}
                        onClick={() => sendMessage()} />
                </div>
            </div>
        </>

    );
};

export default Page;
