'use client'

import AuthForm from "@/components/AuthForm";
import { useType } from "@/app/store/zustand";

const SignUp = () => {
    const {type} = useType();
    return <AuthForm type={type}/>
}

export default SignUp