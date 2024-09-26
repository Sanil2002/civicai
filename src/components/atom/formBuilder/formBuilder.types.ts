import { ButtonsProps, CheckboxProps, DropDownProps, TextAreaProps, TextboxProps } from "./nodeCmp.types";

export interface actionProps {
    (actionKey: string, child: unknown): void;
}
export interface buttonsChildrensProps {
    theme: "primary" | "secondary" | "ternary";
    displayName: string;
    classNames?: React.ComponentProps<"div">["className"];
    icon?: "save" | "update" | "cancel" | "new" | "remove";
    // | "download" | "upload" | JSX.Element
    loading?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    action?: {
        mouseEvent?: "onClick";
        // | 'onMouseEnter' | 'onMouseLeave' | 'onMouseOver' | 'onMouseOut'
        actionKey: string;
        preventDefault?: boolean;
        expected: "formValidate" | "actionKey";
    };
}

export interface ResultData {
    [key: string]: string | number | boolean | object | null;
}
export interface FormOptions {
    controlParentAndChild: boolean;
    type?: "default" | "modal";
    size?: "small" | "medium";
    variant?: "filled" | "outlined";
}
export type FormDataTypes = CheckboxProps | DropDownProps | TextboxProps | TextAreaProps | ButtonsProps
