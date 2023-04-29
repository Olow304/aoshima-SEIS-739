"use client"

import React, {Fragment, useEffect, useState} from "react";
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
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';





const navigation = [
    { name: 'Dashboard', href: '/', icon: FolderIcon, current: false },
    { name: 'Pages', href: 'pages', icon: ServerIcon, current: false },
    { name: 'Profile', href: 'profile', icon: SignalIcon, current: false },
    { name: 'Settings', href: '#', icon: GlobeAltIcon, current: false },
    { name: 'Logout', href: '#', icon: ChartBarSquareIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DashboardLayout({children, params}: {
    children: React.ReactNode,
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [currentPath, setCurrentPath] = useState('')
    const searchParams = usePathname();


    console.log("path: ", searchParams)

    return (
        // <section className="bg-red-500">
        //     {/* Include shared UI here e.g. a header or sidebar */}
        //     <nav></nav>
        //
        //     {children}
        // </section>
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
                                                            // check if the link is logout, assign the logout function to the onClick event
                                                            <li key={item.name}>
                                                                <a
                                                                    href={item.href}
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
                            <h1 className="text-2xl text-white">Your Company</h1>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
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
                            <h1 className="text-base font-semibold leading-7 ">
                                {/*get the url from the navigation and display it here*/}
                                Application

                            </h1>
                        </header>

                        {/* Deployment list */}
                        <div className="px-4 sm:px-6 lg:px-8">
                            {/*Show components based on the navigation name*/}
                            {children}

                        </div>
                    </main>


                </div>
            </div>
        </>
    );
}