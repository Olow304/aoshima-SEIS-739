"use client"

import "../../app/styles/register-component.css"
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import registerHandler from "../../app/api/auth-api/registerAPI"
import { useRouter } from 'next/navigation';
import Link from "next/link";
const RegisterComponent = () => {
    const router = useRouter()
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const onSubmit = async (data: any) => {
        try {
            const response = await registerHandler(
                { method: 'POST', body: data },
                {
                    status(statusCode: any) {
                        this.statusCode = statusCode;
                        return this;
                    },
                    json(data: any) {
                        this.data = data;
                        return this;
                    },
                },
            );

            if (response && response.message === "User registered successfully") {
                router.push("/login")
            }


        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            {/*{domLoaded && (*/}
            {/*    <main className="form-container">*/}
            {/*        <div className="logo-section">*/}
            {/*            <span> CMS</span>*/}
            {/*        </div>*/}
            {/*        <div className="form-content">*/}
            {/*            <form onSubmit={handleSubmit(onSubmit)}>*/}
            {/*                <div className="form-group">*/}
            {/*                    <label>Email</label>*/}
            {/*                    <input type="text" placeholder="john.doe@dev.com" {...register('email', {required: true})} />*/}
            {/*                    {errors.email && <p>Email is required.</p>}*/}
            {/*                </div>*/}

            {/*                <div className="form-group">*/}
            {/*                    <label>Username</label>*/}
            {/*                    <input type="text" placeholder="username" {...register('username', {required: true})} />*/}
            {/*                    {errors.username && <p>Username is required.</p>}*/}
            {/*                </div>*/}

            {/*                <div className="form-group">*/}
            {/*                    <label>Password</label>*/}
            {/*                    <input type="password"*/}
            {/*                           placeholder="password" {...register('password', {required: true})} />*/}
            {/*                    {errors.password && <p>Password is required.</p>}*/}
            {/*                </div>*/}
            {/*                <div className="form-group">*/}
            {/*                    <button type="submit">Register</button>*/}
            {/*                </div>*/}
            {/*            </form>*/}
            {/*            <div className="login-instead">*/}
            {/*                <Link href="/login">Login instead</Link>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </main>*/}
            {/*)}*/}
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        {...register('email', {required: true})}
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.email && <p>Email is required.</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        {...register('username', {required: true})}
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.username && <p>Username is required.</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        {...register('password', {required: true})}
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.password && <p>Password is required.</p>}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Register
                                </button>
                            </div>
                        </form>

                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Login now
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default RegisterComponent