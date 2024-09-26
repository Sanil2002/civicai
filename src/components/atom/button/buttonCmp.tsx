import { Button } from "@/components/ui/button/button"
import { ButtonsProps } from "../formBuilder/nodeCmp.types"

export interface ButtonCmpProps {
    asChild?: boolean;
    node: ButtonsProps & {
        childClass?: string;
        size: 'sm' | 'lg' | 'icon' | 'default';
        formControl: 'button';
    };
    formResult: (value: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function ButtonCmp({ node, formResult, asChild }: ButtonCmpProps) {
    return <Button
        className={node.childClass}
        size={node.size}
        asChild={asChild}
        onClick={formResult}
    >{node.label}
    </Button>
}