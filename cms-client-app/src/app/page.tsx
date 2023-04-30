"use client"
import React, {Fragment, useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import fetchPostCount from "./api/post-api/fetchPostsStats";
import createPost from "./api/create-post/CreatePost";
import { PageRequest } from '@/proto/PageService_pb';

import {useForm} from "react-hook-form";
//import {withAuthInterceptor} from "@/grpc/grpc-client";
import {grpc} from "@improbable-eng/grpc-web";
import client = grpc.client;
import loginHandler from "@/app/api/auth-api/loginAPI";
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    ChartBarSquareIcon,
    Cog6ToothIcon,
    FolderIcon,
    GlobeAltIcon,
    ServerIcon,
    SignalIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import DashboardStatus from "@/components/dashboardStatus/DashboardStatus";
import { MdOutlineDashboard } from 'react-icons/md';
import { RiBookReadLine } from 'react-icons/ri'
import { IoMdPerson } from 'react-icons/io'
import { IoMdSettings } from 'react-icons/io'
import { FiLogOut } from 'react-icons/fi'

const navigation = [
    { name: 'Dashboard', href: '#', icon: MdOutlineDashboard, current: false },
    { name: 'Pages', href: 'dashboard/pages', icon: RiBookReadLine, current: false },
    { name: 'Profile', href: 'dashboard/profile', icon: IoMdPerson, current: false },
    { name: 'Settings', href: '#', icon: IoMdSettings, current: false },
    { name: 'Logout', href: '', icon: FiLogOut, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

type FormData = {
    title: string;
    content: string;
};


const Home = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false)

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

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        //router.push('/login');
        window.location.href = '/login';
    };


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
        <>
            <div className="bg-[#fdfdfd] h-full">
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex bg-gray-900">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                                        <div className="flex h-16 shrink-0 items-center">
                                            {/*<img*/}
                                            {/*    className="h-8 w-auto"*/}
                                            {/*    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"*/}
                                            {/*    alt="Your Company"*/}
                                            {/*/>*/}
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li key={item.name}>
                                                                <a
                                                                    href={item.href}
                                                                    onClick={item.name === 'Logout' ? handleLogout : undefined}
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'bg-gray-800 text-white'
                                                                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )}
                                                                >
                                                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>


                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5 bg-gray-900">
                        <div className="flex h-16 shrink-0 items-center">
                            {/*<img*/}
                            {/*    className="h-8 w-auto"*/}
                            {/*    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"*/}
                            {/*    alt="Your Company"*/}
                            {/*/>*/}
                            <h1 className="text-2xl text-white">Aoshima <span className="text-sm">CMS</span></h1>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    onClick={item.name === 'Logout' ? handleLogout : undefined}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-800 text-white'
                                                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                    )}
                                                >
                                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>


                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="xl:pl-72">
                    <main className="text-gray-700">
                        <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                            <h1 className="text-base font-semibold leading-7 ">Dashboard</h1>
                        </header>

                        {/* Deployment list */}
                        <div className="px-4 sm:px-6 lg:px-8">
                            {/*Show components based on the navigation name*/}
                                <DashboardStatus />
                        </div>
                    </main>


                </div>
            </div>
        </>
    );
};

export default Home;
