import { useEffect, useState } from "react"
import { DefaultCard } from "../../components/atom/Chat/DefaultCard"
import { InputArea } from "../../components/atom/Chat/InputArea"
import { ChatNavbar } from "../../components/ui/chat/ChatNavbar"
// import { ChatSidebar } from "../../components/chat/ChatSidebar"
import { QuestionAnswer } from "../../lib/QuestionAnswer"
import { chatAi } from "../../services/apiServices/apis/api"
// import { Loader } from "../../components/atom/Chat/Loader"
// import { BotMessageSquare, MessageCircleQuestion } from "lucide-react"

export const Chat = () => {

    const [inputValue, setInputValue] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<QuestionAnswer[]>([]);
    const [showDefaultCard, setShowDefaultCard] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const storedChatHistory = localStorage.getItem('chatHistory');
        if (storedChatHistory) {
            setChatHistory(JSON.parse(storedChatHistory));
            setShowDefaultCard(false);
        }
    }, []);

    useEffect(() => {
        if (chatHistory.length > 0) {
            console.log('Saving to local storage:', chatHistory);
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        }
    }, [chatHistory]);

    // const handleQuestionClick = (question: string) => {
    //     setInputValue(question);
    // };

    const handleSendClick = async () => {
        setLoading(true);
        if (!inputValue.trim()) return;

        const newQuestion = inputValue;
        setLoading(true);

        try {
            const response = await chatAi(newQuestion);

            // const data = await response.json();
            // const answer = data.answer || "No response from AI";

            const newEntry: QuestionAnswer = { question: newQuestion, answer: response + "" };
            const updatedHistory = [...chatHistory, newEntry];
            setChatHistory(updatedHistory);
        } catch (error) {
            console.error("Error fetching response from ChatAi:", error);
        } finally {
            setInputValue('');
            setShowDefaultCard(false)
            setLoading(false)
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }, [loading, inputValue]);

    return (
        <div className="bg-[#FFFFFF] min-h-screen flex">
            {/* <div>
                <ChatSidebar />
            </div> */}
            <div className="relative flex flex-col w-full">
                <div className="w-full sticky flex">
                    <ChatNavbar />
                </div>
                <div className="flex justify-center items-center px-[19px] s min-h-[748px] ">
                    {/* ............................................................................................................. */}

                    <div className="chat-container w-[795px] shadow-SM">
                        <div className="chat-area p-6">
                            <div className="flex justify-center items-center">{showDefaultCard && <DefaultCard />}</div>
                            <div className="chat-history">
                                {chatHistory.map((qa, index) => (
                                    <div key={index} className="chat-message p-4 rounded-lg flex flex-col gap-1">
                                        <div className="flex items-start mb-2"><p className="text-gray-700 gap-[5px]"><strong className="flex">You:</strong><div className="bg-slate-100 rounded-2xl p-3 mt-3 min-w-[75px] flex justify-center items-center">{qa.question}</div></p></div>
                                        <div className="items-start">
                                            <strong className="text-gray-700 flex mb-2">assistant:</strong>
                                            <div
                                                className={`relative text-white flex bg-gradient-to-t from-[#003] to-[#003] rounded-3xl p-3 mt-3 ${loading && index === chatHistory.length - 1 ? 'animate-pulse bg-slate-300 text-transparent w-[75px] h-[48px] bg-none' : ''}`}
                                            >
                                                {loading && index === chatHistory.length - 1 ? '' : qa.answer}
                                            </div>
                                        </div>
                                        </div>
                                ))}
                                    </div>
                        </div>
                        </div>

                        {/* {loading && (
                        <div className="absolute inset-0 flex justify-center items-center bg-gray-50 bg-opacity-50 backdrop-blur-sm z-50">
                            <Loader />
                        </div>
                    )} */}

                        {/* ..............................................................................................................*/}
                    </div>
                    <div className="flex w-full h-[80.55555px] py-[13.889px] px-[27.778px] flex-col items-center left-0 bottom-0 sticky">
                        <InputArea inputValue={inputValue} setInputValue={setInputValue} handleSendClick={handleSendClick} />
                        <div className="text-gray-500 text-[13px]">Civic.ai can make mistakes.Cross-check important info</div>
                    </div>
                </div>
            </div>
            )
}