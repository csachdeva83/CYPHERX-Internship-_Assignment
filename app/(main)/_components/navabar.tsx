"use client"

import { TGroup } from "@/utils/types";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocalStorage } from 'usehooks-ts';

const Navbar = () => {

    const [display, setDisplay] = useState<boolean>(false);
    const [groupBy, setGroupBy] = useLocalStorage<TGroup>("groupBy", "user");

    useEffect(() => {
        const set = () => {
            setGroupBy('user');
        }

        return () => set();
    }, []);

    return (
        <nav className="h-full flex items-center justify-between px-7">
            <div 
                className="w-32 flex items-center justify-between px-1 cursor-pointer border-2 border-[#e6e7eb] rounded-md shadow-[0_0_8px_0_#0000001a] relative"
                onClick={() => setDisplay(!display)}
            >
                <Image
                    src="./bar.svg"
                    width="80"
                    height="80"
                    alt="bar"
                    className="-rotate-90 w-4 h-4 text-[#8D8D8D]"
                />
                <span className="text-base">Display</span>
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
                <div className="z-[99999] w-72 h-fit border-2 border-[#e6e7eb] bg-white rounded-md shadow-[0_0_8px_0_#0000001a] flex flex-col absolute top-16 p-6">
                    <div className=" flex items-center justify-between">
                        <span className="text-[#8D8D8D]">Grouping</span>
                        <select 
                            className="outline-none pl-2 rounded-md w-28 h-7 border-2 border-[#e6e7eb] bg-white"
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
                        <select className=" outline-none pl-2 rounded-md w-28 h-7 border-2 border-[#e6e7eb] bg-white">
                            <option>Priority</option>
                            <option>Title</option>
                        </select>
                    </div>
                </div>
                )
            }
            <div
                role="button"
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