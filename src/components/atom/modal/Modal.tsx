import { Button } from '@/components/ui/button/button';
import { ChevronLeftIcon } from 'lucide-react';
import React, { useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?:string;
    classname?: string;
    primarybutton?: boolean;
    primaryValue?: string;
    primaryAction?: () => void;
    secondarybutton?: boolean;
    secondaryValue?: string;
    secondaryAction?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children,title, classname,primarybutton,primaryAction,primaryValue,secondarybutton,secondaryValue,secondaryAction }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center `}
            onClick={handleClickOutside}
        >
            <div
                ref={modalRef}
                className={`flex flex-col gap-[12px]  bg-white w-[600px] min-h-[500px] p-[24px] rounded-lg shadow-lg max-w-lg ${classname}`}
            >
                <div className='flex-1'>
                    {title && 
                    <div className="flex py-[12px] items-center gap-[6px] cursor-pointer" onClick={onClose}>
                        <ChevronLeftIcon />
                        <div className="font-bold text-lg" >
                            {title}
                        </div>
                    </div>}
                    {children}
                </div>
                 <div className='w-full self-stretch  flex gap-2'>
                    {secondarybutton && <Button className='bg-transparent hover:bg-slate-100 w-full' onClick={secondaryAction}>
                        {secondaryValue}
                    </Button>}
                    {primarybutton &&<Button onClick={primaryAction} className='w-full'>
                        {primaryValue}
                    </Button>}
                </div>
            </div>
        </div>
    );
};

export default Modal;
