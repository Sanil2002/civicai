import ProfileButton from "@/components/navbar/profileButton";
import { Button } from "../button/button";
import { MessageCircleOff } from "lucide-react";
import Logo from "@/components/atom/login/logo";

export const ChatNavbar = () => {

    const handleClear = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div className="flex max-h-[80px] w-full rounded-[12px] px-[24px] py-[18px] justify-between items-center self-stretch sticky">
                <div className="h-full w-full flex items-center"><Logo /></div>
            <div className="flex gap-2">
                <Button variant="default" className="font-semibold text-md border-none bg-transparent flex gap-1 hover:text-red-500 shadow-none focus:outline-none" onClick={handleClear}><MessageCircleOff />Clear</Button>
                <ProfileButton />
            </div>
        </div>
    )
}