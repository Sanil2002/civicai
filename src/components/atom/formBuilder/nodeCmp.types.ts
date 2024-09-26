type xsValues = 'xs:w-1/12' | 'xs:w-1/6' | 'xs:w-1/4' | 'xs:w-1/3' | 'xs:w-5/12' | 'xs:w-1/2' | 'xs:w-7/12' | 'xs:w-2/3' | 'xs:w-3/4' | 'xs:w-10/12' | 'xs:w-11/12' | 'xs:w-full'
type smValues = 'sm:w-1/12' | 'sm:w-1/6' | 'sm:w-1/4' | 'sm:w-1/3' | 'sm:w-5/12' | 'sm:w-1/2' | 'sm:w-7/12' | 'sm:w-2/3' | 'sm:w-3/4' | 'sm:w-10/12' | 'sm:w-11/12' | 'sm:w-full'
type mdValues = 'md:w-1/12' | 'md:w-1/6' | 'md:w-1/4' | 'md:w-1/3' | 'md:w-5/12' | 'md:w-1/2' | 'md:w-7/12' | 'md:w-2/3' | 'md:w-3/4' | 'md:w-10/12' | 'md:w-11/12' | 'md:w-full'
type lgValues = 'lg:w-1/12' | 'lg:w-1/6' | 'lg:w-1/4' | 'lg:w-1/3' | 'lg:w-5/12' | 'lg:w-1/2' | 'lg:w-7/12' | 'lg:w-2/3' | 'lg:w-3/4' | 'lg:w-10/12' | 'lg:w-11/12' | 'lg:w-full'
type xlValues = 'xl:w-1/12' | 'xl:w-1/6' | 'xl:w-1/4' | 'xl:w-1/3' | 'xl:w-5/12' | 'xl:w-1/2' | 'xl:w-7/12' | 'xl:w-2/3' | 'xl:w-3/4' | 'xl:w-10/12' | 'xl:w-11/12' | 'xl:w-full'
type xxlValues = 'xxl:w-1/12' | 'xxl:w-1/6' | 'xxl:w-1/4' | 'xxl:w-1/3' | 'xxl:w-5/12' | 'xxl:w-[1/2]' | 'xxl:w-7/12' | 'xxl:w-2/3' | 'xxl:w-3/4' | 'xxl:w-10/12' | 'xxl:w-11/12' | 'xxl:w-full'


interface layoutProps {
    xs?: xsValues,
    sm?: smValues
    md?: mdValues,
    lg?: lgValues,
    xl?: xlValues,
    xxl?: xxlValues,
}


interface commonProps {
    id: string
    label?: string
    fieldName: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    error?: boolean
    layout: layoutProps
}

export interface CheckboxProps extends commonProps {
    formControl: 'checkbox';
    value: boolean;
    defaultValue?: boolean | string;
    childClass?: React.ComponentProps<'div'>['className'];
}

export interface DropchildObj {
    name: string
    value: string
    placeholder?: string
}

export interface DropDownProps extends commonProps {
    formControl: 'dropdown'
    value: string
    childrens: DropchildObj[] | [],
    placeholder?: string,
    defaultValue: string
    childClass?: React.ComponentProps<'div'>['className'];
}

export interface TextboxProps extends commonProps {
    formControl: 'textbox'
    typeInput: 'text' | 'number' | 'email' | 'password'
    maxTextLength?: number
    value: string
    minTextLength?: number
    childClass?: React.ComponentProps<'div'>['className'];
}

export interface TextAreaProps extends commonProps {
    rows: number | undefined
    formControl: 'textarea'
    value: string
    childClass?: React.ComponentProps<'div'>['className'];
}

export interface ButtonsProps extends commonProps {
    formControl: 'button'
    variant: 'default' | 'outlined' | 'destructive' | 'ghost' | 'link'
    size: 'sm' | 'lg' | 'icon' | 'default'
    childClass?: React.ComponentProps<'div'>['className'];
}