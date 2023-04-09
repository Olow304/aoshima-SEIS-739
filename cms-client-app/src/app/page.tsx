"use client"
import { useEffect, useState } from 'react';
import {useRouter} from "next/navigation";
import fetchPostCount from "./api/post-api/fetchPostsStats";
import createPost from "./api/create-post/CreatePost";
import { PageRequest } from '@/proto/PageService_pb';

import {useForm} from "react-hook-form";
//import {withAuthInterceptor} from "@/grpc/grpc-client";
import {grpc} from "@improbable-eng/grpc-web";
import client = grpc.client;
import loginHandler from "@/app/api/auth-api/loginAPI";

type FormData = {
    title: string;
    content: string;
};


const Home = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const [numberOfPosts, setNumberOfPosts] = useState(0);

    const ANALYTICS_URL = 'http://localhost:3001';

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login');
        } else {
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        fetchPostCount().then((response) => {
            if (response) {
                setNumberOfPosts(response);
            }
        });

    }, []);

    const onSubmit = async (data: any) => {
        const request = new PageRequest();
        request.setTitle(data.title);
        request.setContent(data.content);

        // createPost
        try {
            const response = await createPost(
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

            // reset form
            setValue('title', '');
            setValue('content', '');

        } catch (error: any) {
            console.error('Error:', error);
        }

    };


    const logout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    if (!isMounted) {
        return null;
    }

    return (
        <main>
            <h1>Page d</h1>

            <div>
                <button onClick={logout}>Logout</button>
            </div>

            <div>
                <p>Number of posts: {numberOfPosts}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">Title:</label>
                <input id="title" type="text" {...register('title')} />

                <label htmlFor="content">Content:</label>
                <textarea id="content" {...register('content')} />

                <button type="submit">Create Page</button>
            </form>
        </main>
    );
};

export default Home;
