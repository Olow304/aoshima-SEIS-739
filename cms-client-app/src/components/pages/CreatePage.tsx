"use client"
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import registerHandler from "@/app/api/auth-api/registerAPI";
import createPost from "@/app/api/create-post/CreatePost";

const CreatePage = ({setOpen}) => {
    const router = useRouter()
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const onSubmit = async (data: any) => {
        try {
            const response = await createPost(
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
            
            console.log('In CreatePage.tsx, line: 33 ', response);
            if (response && response.status === 200) {
                setOpen(false)
            }

            // if (response && response.message === "User registered successfully") {
            //     router.push("/login")
            // }


        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col ">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[680px]">
                <div className="bg-white">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                               Page title
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    {...register('title', {required: true})}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />

                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Page content
                            </label>
                            <div className="mt-2">
                                <textarea
                                    rows={5}
                                    id="content"
                                    name="content"
                                    {...register('content', {required: true})}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />

                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Create
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default CreatePage