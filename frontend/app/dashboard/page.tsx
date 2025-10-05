"use client"
import React, { useEffect, useRef, useState } from "react";
import {
    PromptInput,
    PromptInputButton,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
} from '@/components/ui/shadcn-io/ai/prompt-input';
import { MicIcon, PaperclipIcon } from 'lucide-react';
import { type FormEventHandler } from 'react';
import { saveChat } from "../actions/saveChat";
import { useSession, signIn, signOut } from "next-auth/react";
import { useChat } from "../context/ChatContext";
import { getMessages } from "../actions/getMessages";

type Message = {
    role: "user" | "assistant";
    content: string;
};


const Page = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const [chatTitle, setchatTitle] = useState('');
    const { chats, setChats, activeChat, setActiveChat, messages, setMessages } = useChat();
    const [email, setemail] = useState('');
    const { data: session } = useSession();

    const [text, setText] = useState<string>('');
    const [status, setStatus] = useState<
        'submitted' | 'streaming' | 'ready' | 'error'
    >('ready');

    // ---------------------------------to show scroll to bottom button-------------------------------
    // Scroll to bottom function
    const scrollToBottom = () => {
        const container = chatContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    };
    // Scroll to bottom on load and set Chat Title and email on load
    useEffect(() => {
        scrollToBottom();
    }, []);
    //Handle when to show scrollto bottom icon
    const handleScroll = () => {
        const container = chatContainerRef.current;
        if (!container) return;

        const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
        setShowScrollBtn(distanceFromBottom > 50);
        console.log("Scrollto bottom button is visible :" + showScrollBtn);
    };
    //-----------------------------------------------------------------------------------------------

    useEffect(() => {
        if (session?.user?.email) {
            setemail(session.user.email);
        }

        if (messages.length == 0 || !chatTitle) {
            setchatTitle(`Chat-${Date.now()}`);
        }
    }, [session?.user])

    useEffect(() => {
        async function fetchMessage() {
            const getChatRes = await getMessages({ title: activeChat, email });
            setMessages(getChatRes.messages);
        }
        setchatTitle(activeChat);
        fetchMessage();
    }, [activeChat])


    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        if (!text) {
            return;
        }
        setStatus('submitted');

        if (!text.trim()) return;
        //first set usermessge
        const userMessage: Message = { role: "user", content: text };
        setMessages([...messages, userMessage]);
        setText("");
        setLoading(true);
        scrollToBottom();

        try {
            const formData = new FormData();
            formData.append("text", text);
            setStatus('streaming');
            // Call your backend API
            const res = await fetch("http://127.0.0.1:8000/analyze", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            // Add assistant response
            const botMessage: Message = { role: "assistant", content: data.answer };
            setMessages([...messages, userMessage, botMessage]);

            const chatdata = { email, title: chatTitle };

            const saveChatRes = await saveChat({ ...chatdata, newMessage: userMessage, });
            if (saveChatRes.isnewChat && activeChat !== chatTitle) {
                setChats([...chats, chatTitle]);
                setActiveChat(chatTitle);
            }
            await saveChat({ ...chatdata, newMessage: botMessage, });
        } catch (err) {
            console.error(err);
            setMessages([...messages, { role: "assistant", content: "Something Went wrong" },]);
        } finally {
            setLoading(false);
        }
        setStatus('ready');
        scrollToBottom();
    };


    return (
        <>
            <div className="relative flex-1 overflow-y-auto w-full max-w-3xl px-2 scroll-smooth scrollbar-hide" ref={chatContainerRef} onScroll={handleScroll}>
                {messages.length == 0 && (
                    <div className="h-3/4 w-full flex flex-col justify-center items-center">
                        <p className="text-2xl font-semibold">Ready when You are.</p>
                    </div>
                )}
                <div className="max-w-3xl mx-auto space-y-4 pt-4 pb-32" >
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
                                <p className="animate-pulse">•••</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            {showScrollBtn && (
                <button
                    onClick={scrollToBottom}
                    className="absolute z-30 bottom-36 right-4 left-1/2 -translate-x-1/2 h-8 w-8 bg-[#353535] border border-white/10 text-white p-2 rounded-full shadow-lg flex justify-center items-center cursor-pointer "
                >
                    <img src='/downarrow.svg' alt="downarrow" />
                </button>
            )}

            <div className="absolute flex bottom-0 justify-center w-full pb-2 pt-2 bg-gradient-to-b from-transparent to-[#212121]">
                <div className="flex flex-col w-full max-w-3xl">
                    {/* Preview Section for Images / Docs */}
                    {image && (
                        <div className="flex gap-2 flex-wrap px-2">
                            <div className="relative">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="preview"
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImage(null); // remove from state
                                        if (fileInputRef.current) {
                                            fileInputRef.current.value = ""; // clear file input value
                                        }
                                    }}
                                    className="absolute top-1 right-1 text-white rounded-full p-1 h-8 w-8 hover:bg-black/50 cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}


                    {/* hidden file input */}
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={(e) => {
                            const files = (e.target as HTMLInputElement).files;
                            if (files && files[0]) {
                                setImage(files[0]);
                            }
                        }}
                    />

                    {/* Input Section */}
                    {/* <div className="flex items-end min-h-13 bg-white/10 rounded-4xl shadow border border-gray-500 p-2">
                        <Plus
                            className="ml-3 mb-2 text-white/90 cursor-pointer"
                            size={20}
                            onClick={handleAddImage}
                        />

                        <textarea
                            ref={textAreaRef}
                            rows={1}
                            placeholder="Ask anything"
                            className="flex-1 mb-2 resize-none bg-transparent px-3 outline-none text-white/90 max-h-40 overflow-y-auto custom-scrollbar"
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={(e) =>
                                e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())
                            }
                        />

                        <SendHorizontal
                            className="mr-3 mb-2 text-white/90 cursor-pointer"
                            size={20}
                            onClick={sendMessage}
                        />
                    </div> */}


                    {/* Input from Shadcn.io (better ui) */}
                    <div className='p-2 w-full'>
                        <PromptInput onSubmit={handleSubmit} className="bg-[#303030] border-white/10 p-2">
                            <PromptInputTextarea
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setText(e.target.value)}
                                value={text}
                                placeholder="Type your message..."
                                className="custom-scrollbar !text-base min-h-12"
                            />
                            <PromptInputToolbar>
                                <PromptInputTools>
                                    <PromptInputButton className="hover:bg-white/15 cursor-pointer" onClick={() => { document.getElementById("fileInput")?.click() }}>
                                        <PaperclipIcon size={16} className="text-white/90" />
                                    </PromptInputButton>
                                    <PromptInputButton className="hover:bg-white/15 cursor-pointer">
                                        <MicIcon size={16} className="text-white/90" />
                                        <span className="text-white/90">Voice</span>
                                    </PromptInputButton>
                                </PromptInputTools>
                                <PromptInputSubmit disabled={!text} status={status} className="bg-white cursor-pointer hover:bg-white/85" />
                            </PromptInputToolbar>
                        </PromptInput>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Page;
