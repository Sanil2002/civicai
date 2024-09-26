
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxProps } from "../formBuilder/nodeCmp.types";
import React from "react";
import { useState } from "react";

interface PropsTypes {
    node: CheckboxProps;
    handleChange: (key: string, value: string | boolean) => void;
}


export function CheckboxCmp(props: PropsTypes) {

    const { node, handleChange } = props;
    const [checked, setChecked] = useState(node?.value || false);


    const handleCheckChange = (checkvalue: boolean) => {
        node?.fieldName && handleChange(node?.fieldName, checkvalue)
        setChecked(checkvalue);
    }

    React.useEffect(() => {
        setChecked(node?.value)
    }, [node?.value])

    return (
        <div className="flex items-center space-x-2">
            <Checkbox id={node?.id}
                name={node?.fieldName}
                onCheckedChange={(val) => handleCheckChange(Boolean(val))}
                checked={checked} />
            <label
                htmlFor={node?.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {node?.label}
            </label>
        </div>
    )
}