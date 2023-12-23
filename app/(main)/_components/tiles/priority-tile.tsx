import { statusIconDarkThemeMap, statusIconLightThemeMap } from "@/utils/icon-map";
import { IUserNameAvailabeTicket } from "@/utils/types";
import Image from "next/image";
import UserLogo from "../user-logo";

const PriorityTile = ({ ticket }: {ticket: IUserNameAvailabeTicket}) => {

    return (
        <div className="md:w-[calc(100vw-55vw)] lg:w-[calc(100vw-70vw)] xl:w-[calc(100vw-78vw)] 2xl:w-[calc(100vw-82vw)] w-[calc(100vw-10vw)] h-fit flex items-start justify-between flex-col bg-white px-5 py-2 rounded-md shadow-[0_0_8px_0_#0000001a] mb-4 dark:bg-[#161B22] dark:border-2 dark:border-[#4a4a4a]">
            <div className="w-full flex items-center justify-between">
                <span className="text-[#8D8D8D]">{ticket.id}</span>
                <UserLogo userName={ticket.name} available={ticket.available} />
            </div>
            <div className="flex items-center">
                <Image
                    src={`./${statusIconLightThemeMap[ticket.status.toLocaleLowerCase()]}.svg`}
                    alt="status"
                    width="25"
                    height="25"
                    className="dark:hidden"
                />
                <Image
                    src={`./${statusIconDarkThemeMap[ticket.status.toLocaleLowerCase()]}.svg`}
                    alt="status"
                    width="25"
                    height="25"
                    className="hidden dark:block"
                />
                <span className="ml-1 dark:text-white">{ticket.title}</span>
            </div>
            <div className="mt-1 w-[135px] flex items-center justify-between border-[2px] px-[2px] border-[#e6e7eb] dark:border-[#4a4a4a]">
                <Image
                    src="./circle.svg"
                    alt="tag"
                    width="15"
                    height="15"
                />
                <span className="text-[#8D8D8D] text-sm">{ticket.tag[0]}</span>
            </div>
        </div>
    );
}
 
export default PriorityTile;