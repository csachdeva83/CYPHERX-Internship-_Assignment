"use client"

import { TGroup, TOrder } from "@/utils/types";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useLocalStorage } from 'usehooks-ts';

const Navbar = () => {

    const [display, setDisplay] = useState<boolean>(false);
    const [groupBy, setGroupBy] = useLocalStorage<TGroup>("groupBy", "user");
    const [orderBy, setOrderBy] = useLocalStorage<TOrder>("orderBy", "title");
    const { theme, setTheme } = useTheme();

    let dropdownref = useRef<HTMLDivElement>(null);
    let displayref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (event: MouseEvent) => {
            if(dropdownref.current && displayref.current && !dropdownref.current.contains(event.target as Node) && !displayref?.current.contains(event.target as Node)){
                setDisplay(!display);
            }
        }

        document.addEventListener("mousedown", handler);

        return () => document.removeEventListener("mousedown", handler);
    })

    useEffect(() => {
        const set = () => {
            setGroupBy(groupBy);
            setOrderBy(orderBy);
        }

        return () => set();
    }, []);

    const toggleTheme = () => {
        if(theme === "light") setTheme("dark");
        else setTheme("light");
    }

    return (
        <nav className="h-full flex items-center justify-between px-7 dark:bg-[#161B22]">
            <div 
                ref={displayref}
                className="w-32 flex items-center justify-between px-1 cursor-pointer border-2 border-[#e6e7eb] rounded-md shadow-[0_0_8px_0_#0000001a] dark:shadow-[0_0_8px_0_#ffffff22] dark:border-[#4a4a4a] relative"
                onClick={() => setDisplay(!display)}
            >
                <Image
                    src="./bar.svg"
                    width="80"
                    height="80"
                    alt="bar"
                    className="-rotate-90 w-4 h-4 text-[#8D8D8D]"
                />
                <span className="text-base dark:text-white">Display</span>
                <Image
                    src="./dropdown.svg"
                    width="80"
                    height="80"
                    alt="dropdown"
                    className={`w-7 h-7 !text-[#8D8D8D] transition-transform duration-500 ease-in-out ${display ? 'rotate-180' : ''}`}
                />
            </div>
            {
                display && (
                <div ref={dropdownref} className="z-[99999] w-72 h-fit border-2 border-[#e6e7eb] bg-white dark:bg-[#161B22] rounded-md shadow-[0_0_8px_0_#0000001a] dark:shadow-[0_0_8px_0_#ffffff22] dark:border-[#4a4a4a] flex flex-col absolute top-16 p-6">
                    <div className=" flex items-center justify-between">
                        <span className="text-[#8D8D8D]">Grouping</span>
                        <select 
                            className="outline-none pl-2 rounded-md w-28 h-7 border-2 border-[#e6e7eb] bg-white dark:bg-[#161B22] dark:text-white dark:border-[#4a4a4a]"
                            onChange={(event: ChangeEvent<HTMLSelectElement>) => setGroupBy(event.target.value as TGroup)}
                            value={groupBy}
                        >
                            <option value="user" >User</option>
                            <option value="status">Status</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                    <div className=" flex items-center justify-between mt-3">
                        <span className="text-[#8D8D8D]">Ordering</span>
                        <select 
                            className=" outline-none pl-2 rounded-md w-28 h-7 border-2 border-[#e6e7eb] bg-white dark:bg-[#161B22] dark:text-white dark:border-[#4a4a4a]"
                            onChange={(event: ChangeEvent<HTMLSelectElement>) => setOrderBy(event.target.value as TOrder)}
                            value={orderBy}
                        >
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                </div>
                )
            }
            <div
                role="button"
                onClick={toggleTheme}
            >
                <Image
                    src="./dark.svg"
                    alt="dark"
                    width="32"
                    height="32"
                    className="dark:hidden"
                />
                <Image
                    src="./light.svg"
                    alt="dark"
                    width="32"
                    height="32"
                    className="hidden dark:block"
                />
            </div>
        </nav>
    );
}
 
export default Navbar;