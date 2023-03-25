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

    const onSubmit = async (data) => {
        try {
            const response = await registerHandler(
                { method: 'POST', body: data },
                {
                    status(statusCode) {
                        this.statusCode = statusCode;
                        return this;
                    },
                    json(data) {
                        this.data = data;
                        return this;
                    },
                },
            );

            if (response.message === "User registered successfully") {
                router.push("/login")
            }

            console.log('In RegisterComponent.tsx, line: 37 ', response);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            {domLoaded && (
                <main className="form-container">
                    <div className="logo-section">
                        <span> CMS</span>
                    </div>
                    <div className="form-content">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" placeholder="john.doe@dev.com" {...register('email', {required: true})} />
                                {errors.email && <p>Email is required.</p>}
                            </div>

                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" placeholder="username" {...register('username', {required: true})} />
                                {errors.username && <p>Username is required.</p>}
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password"
                                       placeholder="password" {...register('password', {required: true})} />
                                {errors.password && <p>Password is required.</p>}
                            </div>
                            <div className="form-group">
                                <button type="submit">Register</button>
                            </div>
                        </form>
                        <div className="login-instead">
                            <Link href="/login">Login instead</Link>
                        </div>
                    </div>
                </main>
            )}
        </>
    )
}

export default RegisterComponent