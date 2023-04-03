"use client"
import { useEffect, useState } from 'react';
import {useRouter} from "next/navigation";

import { PageRequest } from '@/proto/PageService_pb';

import {useForm} from "react-hook-form";
//import {withAuthInterceptor} from "@/grpc/grpc-client";
import {grpc} from "@improbable-eng/grpc-web";
import client = grpc.client;

type FormData = {
    title: string;
    content: string;
};


const Home = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login');
        } else {
            setIsMounted(true);
        }
    }, []);

    const onSubmit = (data: any) => {
        // const request = new PageRequest();
        // request.setTitle(data.title);
        // request.setContent(data.content);
        //
        // withAuthInterceptor(client, 'createPage', request, (err: any, response: any) => {
        //     if (err) {
        //         console.error("Error: ", err);
        //     } else {
        //         console.log("Page created: ", response.toObject());
        //         setValue('title', '');
        //         setValue('content', '');
        //     }
        // });
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
