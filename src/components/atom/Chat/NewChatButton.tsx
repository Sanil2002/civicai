export const NewChatButton = () => {
    return (
        <button className="flex py-[5.556px] px-[11.111px] gap-[5.556px] justify-center items-center self-stretch
                         rounded-[8.333px] bg-white">
            <div className="w-[15px] h-[15px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M7.5729 3.48266C7.5729 3.24295 7.37858 3.04863 7.13888 3.04863C6.89917 3.04863 6.70485 3.24295 6.70485 3.48266V6.95488H3.23263C2.99292 6.95488 2.7986 7.1492 2.7986 7.38891C2.7986 7.62861 2.99292 7.82294 3.23263 7.82294H6.70485V11.2952C6.70485 11.5349 6.89917 11.7292 7.13888 11.7292C7.37858 11.7292 7.5729 11.5349 7.5729 11.2952V7.82294H11.0451C11.2848 7.82294 11.4792 7.62861 11.4792 7.38891C11.4792 7.1492 11.2848 6.95488 11.0451 6.95488H7.5729V3.48266Z" fill="black" />
                </svg>
            </div>
            <div className="flex flex-col justify-center items-start rounded-[5.556px]">
               <h1 className="text-black text-center font-Inter text-[12.5px] font-semibold">New chat</h1>
            </div>
        </button>
    )
}