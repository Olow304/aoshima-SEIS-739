"use client"
import {Fragment, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import CreatePage from "@/components/pages/CreatePage";
import getPages from "@/app/api/create-post/GetPages";
import createPost from "@/app/api/create-post/CreatePost";
import UpdatePage from "@/components/pages/UpdatePage";



const Pages = () => {
    const [open, setOpen] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [updatePage, setUpdatePage] = useState({})

    // get all pages from getPages
    const [pages, setPages] = useState([])

    const getPagesFunc = async () => {
        const response = await getPages(
            { method: 'GET'},
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

        setPages(response.data)

    }

    useEffect(() => {

        getPagesFunc();

        console.log('In Pages.tsx, line: 33 ', pages);

    }, [])

    const openUpdateComponent = async (page: any) => {
        setIsUpdating(true)
        setUpdatePage(page)
        setOpen(true)
        console.log('In page.tsx, line: 49 ', page);

    }

    return (
        <>
            <div className="">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Pages</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the pages in your website.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add page
                        </button>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Page title
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Content
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Page View
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            is Published
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                    {pages.map((page) => (
                                        <tr key={page.email}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{page.title}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{page.content}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{page.pageview}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">true</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <a onClick={() => openUpdateComponent(page)} className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                                    Edit<span className="sr-only">, {page.title}</span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => null }>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                        Create a new page
                                                    </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">

                                                {!isUpdating ? <CreatePage setOpen={setOpen}/> : <UpdatePage propsData={updatePage} setOpen={setOpen}/> }
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

        </>
    );
}

export default Pages;