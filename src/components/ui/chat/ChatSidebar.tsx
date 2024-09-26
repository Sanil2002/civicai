import { NewChatButton } from "../atom/Chat/NewChatButton"

export const ChatSidebar = () => {
    return(
        <div className="flex flex-col w-[305px] min-h-full p-[20px] bg-gradient-to-t from-[#003] to-[#003] rounded-tr-[16.667px] rounded-br-[16.667px] border-r-[1px] border-gray-300">
            <NewChatButton />
        </div>
    )
}