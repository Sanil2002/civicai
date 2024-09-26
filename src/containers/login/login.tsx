import React, { useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "../auth/authClient"
// import ComponentMap from "../../atom/componentmap";
// import ThemedButton from "../../atom/ThemedButton/themedButton";
import { activityState } from "../../configs/constants";
// import Logo from '../../utils/images/logo.png';
import { Store } from "react-notifications-component";
import * as KeyCode from 'keycode-js';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
import { formValidation } from "../../utils/utilities";
// import LockResetIcon from '@mui/icons-material/LockReset';
// import { resetPassword } from '../../services/api'
import { useSelector } from "react-redux";
import FormBuilder, { FormBuilderRef } from "@/components/atom/formBuilder/formBuilder";
import { actionProps, FormDataTypes } from "@/components/atom/formBuilder/formBuilder.types";
import { Button } from "@/components/ui/button/button";
import { LockKeyholeOpen } from "lucide-react";
import Logo from "@/components/atom/login/logo";


const Login = (props: any) => {
    const auth = useAuth();
    // const logoDetails = useSelector((state: any) => state.logoDetails.details);
    const [loginPageStatus, setLoginPageStatus] = useState<string>('login');
    //--------------------------------------------------------------------------------------------

    const [credentials,setCredentials] = useState({})
    const loginFormData: FormDataTypes[] = [
        {

            id: '1',
            formControl: "textbox",
            typeInput: 'text',
            fieldName: "username",
            label: "Username",
            value: "",
            placeholder: "Username",
            required: true,
            disabled: false,
            layout: {
                lg: "lg:w-full",
                md: "md:w-full",
                sm: "sm:w-full"
            },
            
            childClass: "" // @dev classes for styling the input field wrapper
        },
        {
            id: '2',
            formControl: "textbox",
            typeInput: 'password',
            fieldName: "password",
            label: "Password",
            value: "",
            placeholder: "Password",
            required: true,
            disabled: false,
            layout: {
                lg: "lg:w-full",
                md: "md:w-full",
                sm: "sm:w-full"
            },
            childClass: "" // @dev classes for styling the input field wrapper
        },

    ];
    const formBuilderRef = useRef<{ submitForm: () => void }>(null);

    const formActions: actionProps = (action: string, data: unknown): void => {
        console.log("formActions", action, data);
    };

    const handleFormResult = (result: any) => {
        console.log("Form Result:" , result);
        
        handleLogin(result)
         
    }
    
    const handleLogin = async(payload: { username: string, password: string }) => {
        console.log("testpassword", payload)
        auth.tryLogin(payload, (isAuthenticated: any) => {
        })
    }

    const triggerFormSubmit = () => {
        console.log("sdfsd");
        
        if (formBuilderRef.current) {
            formBuilderRef.current.submitForm();  // Call the exposed submit method
        }
        
    };

    


    //-----------------------------------------------------------------------------------------
    const [email, setEmail] = useState<string>('');
    const resertPasswordField = [
        {
            name: 'email',
            title: 'Email Address',
            value: '',
            type: 'email',
            required: true,
            errormessage: "Please enter a valid email.",
        }]

    const [resetPasswordData, setRestPasswordData] = useState<any>(JSON.parse(JSON.stringify(resertPasswordField)))
    const [data, setData] = React.useState<any>([
        {
            name: 'username',
            title: 'User Name',
            autoFocus: true,
            required: true,
            value: '',
            id: "username",
            errormessage: "Please enter a user name.",
        },
        {
            name: 'password',
            title: 'Password',
            type: "password",
            required: true,
            value: undefined,
            id: "username_password",
            errormessage: "Please enter a valid password.",
            autoComplete: "off"
        }
    ]);

    // const handleResetPassword = (data: any) => {
    //     // console.log("resetpassword",data)
    //     setEmail(data.email)
    //     resetPassword(data).then((res: any) => {
    //         if (res.success) {
    //             setLoginPageStatus('reset_success')
    //         }
    //         else {
    //             Store.addNotification({
    //                 title: "Failed",
    //                 message: "Please try again.",
    //                 type: "danger",
    //                 insert: "top",
    //                 container: "top-right",
    //                 animationIn: ["animate__animated", "animate__fadeIn"],
    //                 animationOut: ["animate__animated", "animate__fadeOut"],
    //                 dismiss: {
    //                     duration: 5000,
    //                     onScreen: false,
    //                 },
    //             });
    //         }
    //     })
    // }

    const handleEnter = (e: any) => {
        if (e.keyCode === KeyCode.KEY_RETURN) {
            const result: any = formValidation(data)
            if (result.valiState) {
                handleLogin(result.ObjectData);
            } else {
                Store.addNotification({
                    title: "Input Error",
                    message: result.msg,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: false,
                    },
                });
            }
        }
    }
    // const [inputRef, setInputFocus] = useFocus()
    // console.log("datadatadatadata",data)
    useEffect(() => {
        document.addEventListener('keyup', handleEnter, true);
        return () => {
            document.removeEventListener('keyup', handleEnter, true)
        }
    }, [])

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleCancel = (status: string) => {
        setLoginPageStatus(status);
        setEmail('');
        setRestPasswordData(JSON.parse(JSON.stringify(resertPasswordField)))
    }
    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement

    return <div className="h-screen  w-screen flex justify-center items-center">
        <div className="h-[480px] w-[800px] shadow-lg flex rounded-[20px] bg-[white] overflow-hidden">
            <div className="w-[450px] flex justify-center items-center p-[20px] bg-[#293241] text-[white]">
                <div>
                    <div className="text-[32px] font-[700] ">Welcome back</div>
                    <div className="text-[16px] mt-8">
                        You are just a few clicks away from a great assistance service.
                    </div>
                    <div className="text-[16px] mt-6">
                        Collaborate and work from anywhere.
                    </div>
                </div>
            </div>
            <div className="flex justify-center  items-center w-[350px] p-[20px] ">
                <div className =" w-full h-full flex justify-center  items-center flex-col gap-[32px]">
                    {/* <img className="h-8 mx-1 mb-8" src={logoDetails.logoWhite.length > 50 ? logoDetails.logoWhite : (sessionStorage.subdomainLogo ?? Logo)} alt="login" /> */}
                    <div className="w-full  flex items-center justify-center">
                    <Logo/>
                    </div>
                    {
                        loginPageStatus === 'reset' ?
                            <>
                                {/* <ComponentMap data={resetPasswordData} setData={setRestPasswordData} />
                                <div className="flex justify-between p-2 mt-2 ">
                                    <ThemedButton click={() => handleCancel('login')} children={'Cancel'} theme={"warning"} />
                                    <ThemedButton icon="custom" iconComponent={<LockResetIcon />} loading={auth.isAuthenticated === activityState.WAIT} click={handleResetPassword} valiData={resetPasswordData} change={setRestPasswordData} children={'Reset'} theme={"secondary"} />
                                </div> */}
                            </>
                            : loginPageStatus === 'login' ?
                                // <>
                                //     {/* <ComponentMap data={data} setData={setData} /> */}
                                //     <input type="text" className="bg-[#ffffff]" placeholder="username" onChange={(e) => setUserName(e.target.value)} />
                                //     <input type="password" className="bg-[#ffffff]" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                                //     <div className="flex justify-between p-2 mt-2 ">
                                //         <div className="pt-3">
                                //             <span className="cursor-pointer" onClick={() => setLoginPageStatus('reset')}>Forgot Password?</span>
                                //         </div>
                                //         <div>
                                //             <button onClick={() => handleLogin({ username: username, password: password })}>Login</button>
                                //             {/* <ThemedButton icon="custom" iconComponent={<LockOpenIcon />} loading={auth.isAuthenticated === activityState.WAIT} click={handleLogin} valiData={data} change={setData} children={'Login'} theme={"secondary"} /> */}
                                //         </div>
                                //     </div>
                                // </>
                                <div className="  flex flex-col gap-[32px]">
                                    <FormBuilder
                                        ref={formBuilderRef}
                                        formActions={formActions}
                                        options={{ type: 'default', size: "medium", controlParentAndChild: false }}
                                        handleFormResult={handleFormResult}
                                        formData={loginFormData}
                                        parentClass='w-full h-full flex flex-wrap'
                                    />
                                    <div className="w-full flex">
                                        <Button className="bg-transparent border-0 shadow-none flex justify-start flex-1">Forgot password?</Button>
                                    <Button onClick={triggerFormSubmit} variant="outline" className=" flex gap-2 "><LockKeyholeOpen/> Login</Button>
                                    </div>

                                </div>
                                : loginPageStatus === 'reset_success' &&

                                <div>
                                    <div className="text-[16px] font-[700] ">Password Reset</div>
                                    <div className=" text-md my-3">
                                        An email has been sent to <span className="font-semibold">{email}</span> with instructions for resetting your password.
                                        {/* <div className=" mt-3">Please check your email .</div> */}
                                    </div>
                                    <div className="flex justify-center p-2 mt-2 ">
                                        {/* <ThemedButton click={() => handleCancel('login')} children={'Login'} theme={"secondary"} /> */}
                                    </div>

                                </div>

                    }

                    <div className="border-b m-3 border-[#00000030]"></div>
                    {/* <div className="flex justify-between p-2 mt-2 ">
                        <div className="pt-3">
                            <span className="cursor-pointer">Don’t have an account?</span>
                        </div>
                        <div>
                            <ThemedButton children={'Sign Up'} theme={"primary"} />
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
}

export default Login