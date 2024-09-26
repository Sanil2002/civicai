import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TextAreaProps } from "../formBuilder/nodeCmp.types"
import React from "react"
import { useState } from "react"

type PropTypes = {
    node: TextAreaProps
    handleChange: (key: string, value: string) => void
}
export function TextareaCmp(props: PropTypes) {

    const { node, handleChange } = props;
    const [value, setValue] = useState(node?.value);

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarevalue = event.target.value
        handleChange(node?.fieldName, textarevalue)
        setValue(event.target.value);
    };

    React.useEffect(() => {
        setValue(node?.value)
    }, [node?.value])

    return (
        <div className="grid w-full gap-1.5">
            <Label htmlFor={node?.id}>{node?.label}</Label>
            <Textarea
                value={value}
                placeholder={node?.placeholder}
                id={node?.id}
                name={node?.fieldName}
                rows={node?.rows}
                disabled={node?.disabled}
                // onChange={(e) => node?.fieldName && handleChange?.(node?.fieldName, e.target.value)} 
                onChange={handleTextAreaChange}
            />
        </div>
    )
}