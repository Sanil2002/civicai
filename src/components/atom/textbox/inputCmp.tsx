import { Input } from "@/components/ui/input"
import { TextboxProps } from "../formBuilder/nodeCmp.types"

interface InputCmpProps {
    node: TextboxProps
    handleChange: (key: string, value: string) => void
}

export function InputCmp({ node, handleChange }: InputCmpProps) {
    return <Input
        node={node}
        handleChange={handleChange}
    />
}