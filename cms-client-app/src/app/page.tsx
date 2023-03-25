"use client"
import { useEffect, useState } from 'react';
import {useRouter} from "next/navigation";

const Home = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login');
        } else {
            setIsMounted(true);
        }
    }, []);

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
        </main>
    );
};

export default Home;
