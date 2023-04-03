"use client"

import {useEffect, useState} from "react";
import "../../app/styles/login-component.css"
import Link from "next/link";
import {useForm} from "react-hook-form";
import loginHandler from "@/app/api/auth-api/loginAPI";
import {useRouter} from "next/navigation";

const LoginComponent = () => {
    const router = useRouter()
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);


    const onSubmit = async (data: any) => {
        // Log data submitted from the form
        try {
            const response = await loginHandler(
                {method: 'POST', body: data},
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

            if (response && response.status === 200 && response.token) {
                // Store the token in localStorage
                localStorage.setItem('token', response.token);
                router.push("/")
            }

            console.log('In LoginComponent.tsx, line: 37 ', response);

        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            {domLoaded && (
                <div className="login">
                    <h1>Log In</h1>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                {...register('email', {required: true})}
                            />
                            {errors.email && <p>Email is required.</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                {...register('password', {required: true})}
                            />
                            {errors.password && <p>Password is required.</p>}
                        </div>

                        <div className="form-group">
                            <button type="submit" disabled={loading}>
                                Log In
                            </button>
                        </div>
                    </form>

                    <div className="login-instead">
                        <Link href="/register">Register now</Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginComponent