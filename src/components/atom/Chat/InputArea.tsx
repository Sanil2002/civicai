import React from "react";
import { chatAi } from "../../../services/apiServices/apis/api";
import { Paperclip, SendHorizontal } from "lucide-react";

interface InputAreaProps {
    inputValue: string;
    setInputValue: (value: string) => void;
    handleSendClick: (response: any) => void;
}

export const InputArea: React.FC<InputAreaProps> = ({ inputValue, setInputValue, handleSendClick }) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault(); 
          handleSendClick(event as unknown as React.FormEvent<HTMLFormElement>); 
        }
      };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return; 

        try {
            const response = await chatAi(inputValue);
            handleSendClick(response); 
        } catch (error) {
            console.error("Error fetching AI response:", error);
        } finally {
            setInputValue(""); 
        }
    };

    return (
        <div className="flex w-[527.778px] lg:w-[795px] h-[46.889px] flex-col justify-center items-start gap-[2.778px] rounded-[19.111px] bg-gray-100 flex-wrap content-center py-[11px] px-[11px]">
            <div className="flex flex-row gap-[8px] min-h-full min-w-full items-center">
                <div className="w-[30px] h-[30px] flex justify-center items-center cursor-pointer">
                <Paperclip />
                </div>
                {/* <div className="w-[30px] h-[30px] mr-[8px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 15 15" fill="none">
                        <path d="M12.4132 2.55902H2.86458C2.63435 2.55902 2.41356 2.65048 2.25077 2.81327C2.08798 2.97606 1.99652 3.19685 1.99652 3.42708V11.2396C1.99652 11.4698 2.08798 11.6906 2.25077 11.8534C2.41356 12.0162 2.63435 12.1076 2.86458 12.1076H12.4132C12.6434 12.1076 12.8642 12.0162 13.027 11.8534C13.1898 11.6906 13.2812 11.4698 13.2812 11.2396V3.42708C13.2812 3.19685 13.1898 2.97606 13.027 2.81327C12.8642 2.65048 12.6434 2.55902 12.4132 2.55902ZM12.4132 3.42708V9.00162L10.9988 7.58778C10.9182 7.50715 10.8225 7.44319 10.7172 7.39955C10.6118 7.35592 10.4989 7.33346 10.3849 7.33346C10.2709 7.33346 10.158 7.35592 10.0527 7.39955C9.94735 7.44319 9.85165 7.50715 9.77104 7.58778L8.68597 8.67284L6.29882 6.28569C6.13605 6.12302 5.91534 6.03165 5.68521 6.03165C5.45509 6.03165 5.23438 6.12302 5.07161 6.28569L2.86458 8.49272V3.42708H12.4132ZM2.86458 9.72048L5.68576 6.8993L10.026 11.2396H2.86458V9.72048ZM12.4132 11.2396H11.2538L9.30067 9.28645L10.3857 8.20138L12.4132 10.2294V11.2396ZM8.50694 5.81423C8.50694 5.68547 8.54512 5.55959 8.61666 5.45253C8.68819 5.34547 8.78987 5.26202 8.90884 5.21275C9.0278 5.16347 9.1587 5.15058 9.28499 5.1757C9.41128 5.20082 9.52728 5.26282 9.61833 5.35387C9.70938 5.44492 9.77139 5.56093 9.79651 5.68722C9.82163 5.81351 9.80874 5.94441 9.75946 6.06337C9.71019 6.18233 9.62674 6.28401 9.51968 6.35555C9.41261 6.42709 9.28674 6.46527 9.15798 6.46527C8.98531 6.46527 8.81972 6.39668 8.69762 6.27459C8.57553 6.15249 8.50694 5.9869 8.50694 5.81423Z" fill="#1C1C1C" />
                    </svg>
                </div> */}
                <div className="w-full h-[35px] flex justify-center">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Message Civic.ai"
                        className="flex-grow lg:min-w-[567px] min-w-[167px] shrink-0 balance-0 rounded-[8px] font-normal text-[15.722px] bg-gray-100 px-[20px] text-gray-600 focus:outline-none overflow-scroll" />
                </div>
                <div className="w-[30px] h-[30px] flex justify-center items-center cursor-pointer" onClick={handleSendMessage}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 14 15" fill="#1C1C1C">
                        <path d="M12.1735 6.57378L3.05887 1.37142C2.90524 1.28523 2.72901 1.24783 2.55361 1.26419C2.37821 1.28054 2.21194 1.34987 2.07688 1.46297C1.94182 1.57607 1.84436 1.72758 1.79746 1.89738C1.75056 2.06719 1.75644 2.24724 1.8143 2.41363L3.49616 7.32194C3.49594 7.32374 3.49594 7.32556 3.49616 7.32736C3.49585 7.32916 3.49585 7.33099 3.49616 7.33279L1.8143 12.252C1.76796 12.3828 1.75369 12.5229 1.77269 12.6605C1.7917 12.798 1.84342 12.929 1.92351 13.0424C2.0036 13.1558 2.10973 13.2484 2.233 13.3123C2.35626 13.3762 2.49305 13.4096 2.6319 13.4097C2.78254 13.4093 2.93054 13.3701 3.06159 13.2958L12.1713 8.08474C12.3057 8.00947 12.4176 7.8998 12.4956 7.76698C12.5736 7.63417 12.6148 7.48299 12.6151 7.32897C12.6154 7.17495 12.5747 7.02363 12.4972 6.89053C12.4196 6.75744 12.3081 6.64737 12.174 6.57161L12.1735 6.57378ZM2.6319 12.5417V12.5368L4.2671 7.76736H7.4062C7.52132 7.76736 7.63171 7.72163 7.71311 7.64024C7.79451 7.55884 7.84023 7.44844 7.84023 7.33333C7.84023 7.21822 7.79451 7.10782 7.71311 7.02643C7.63171 6.94503 7.52132 6.8993 7.4062 6.8993H4.27144L2.63515 2.13151L2.6319 2.125L11.7465 7.32411L2.6319 12.5417Z" fill="#1C1C1C"/>
                    </svg> */}
                    <SendHorizontal />
                </div>
            </div>
        </div>
    )
}