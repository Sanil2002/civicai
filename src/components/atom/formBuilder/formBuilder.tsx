import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { ResultData, FormDataTypes, FormOptions, actionProps } from './formBuilder.types';
import { CheckboxCmp } from '@/components/atom/checkbox/checkboxCmp';
import { ButtonsProps, CheckboxProps, DropDownProps, TextAreaProps, TextboxProps } from './nodeCmp.types';
import { DropDownCmp } from '@/components/atom/dropdown/dropDown';
import { InputCmp } from '@/components/atom/textbox/inputCmp';
import { TextareaCmp } from '@/components/atom/textarea/textAreaCmp';
import { ButtonCmp } from '@/components/atom/button/buttonCmp';

interface FormBuilderProps {
    formData: FormDataTypes[],
    options?: FormOptions,
    formActions?: actionProps,
    parentClass?: string,
    handleFormResult: (result: ResultData) => void
}

export interface FormBuilderRef {

    submitForm: () => void;

}

const FormBuilder = forwardRef<FormBuilderRef, FormBuilderProps>(({ formData, handleFormResult, options = { size: "medium", variant: "outlined", type: "default", controlParentAndChild: false }, ...props }, ref): JSX.Element => {

    const result = useRef<ResultData>({});
    const handleChange = (key: string, value: string | boolean): void => {
        const updatedResult = { ...result.current, [key]: value };
        result.current = updatedResult;
    };

    const FormSubmit = () => {

        console.log("sdfsd");
        
        handleFormResult(result.current);
    }
    const IntialFunctions = useCallback(() => {
        const data: ResultData = {};
        formData.forEach((node: FormDataTypes) => {
            if (node.formControl === 'checkbox') {
                data[node.fieldName] = node.value || false;
            } else if ((node.formControl === 'button')) {
                return null
            } else {
                data[node.fieldName] = node.value || '';
            }
        });
        result.current = data;
        handleFormResult(data);
    }, [formData, result]);

    useEffect(() => {
        IntialFunctions();
    }, []);

    // Use `useImperativeHandle` to expose internal methods like `FormSubmit`
    useImperativeHandle(ref, () => ({
        submitForm: FormSubmit,  // Expose the submit method
    }));
    return (
        <>
            {options.type === 'modal' && <div className="fixed inset-0 bg-ba backdrop-blur-sm bg-opacity-40 transition-opacity"></div>}
            <div className={`${options.type === 'modal' ? 'fixed inset-0 z-10 w-screen overflow-y-auto' : ''}`}>
                <div className={`${options.type === 'modal' ? 'flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0' : ''}`}>
                    <div className={`${options.type === 'modal' ? 'bg-[white] p-4' : `w-full ${options.controlParentAndChild ? `${props.parentClass}` : ''}`}`}>
                        {formData.map((node: FormDataTypes, index: number) => {
                            const layoutClasses = node.layout
                                ? `${node.layout.lg} ${node.layout.md} ${node.layout.sm}`
                                : 'w-[100%]';
                            const formControl = (() => {
                                switch (node.formControl) {
                                    case 'checkbox':
                                        return <CheckboxCmp node={node as CheckboxProps} handleChange={handleChange} />
                                    case 'dropdown':
                                        return <DropDownCmp node={node as DropDownProps} handleChange={handleChange} />
                                    case 'textbox':
                                        return <InputCmp node={node as TextboxProps} handleChange={handleChange} />
                                    case 'textarea':
                                        return <TextareaCmp node={node as TextAreaProps} handleChange={handleChange} />
                                    case 'button':
                                        return <ButtonCmp node={node as ButtonsProps} formResult={FormSubmit} />
                                    default:
                                        return null;
                                }
                            })();
                            return (
                                <div
                                    key={index}
                                    className={`${node.childClass} ${layoutClasses} inline-block p-2`}
                                >
                                    {formControl}
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
        </>
    );
});

export default FormBuilder;