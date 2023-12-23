import { priorityIconDarkThemeMap, priorityIconLightThemeMap, statusIconDarkThemeMap, statusIconLightThemeMap } from "@/utils/icon-map";
import { IUserNameAvailabeTicket } from "@/utils/types";
import Image from "next/image";

const UserTile = ({ ticket }: {ticket: IUserNameAvailabeTicket}) => {

    return (
        <div className="w-80 h-fit flex items-start justify-between flex-col bg-white dark:bg-[#161B22] dark:border-2 dark:border-[#4a4a4a] px-5 py-2 rounded-md shadow-[0_0_8px_0_#0000001a] mb-4">
            <span className="text-[#8D8D8D]">{ticket.id}</span>
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
            <div className="mt-1 flex items-center">
                <Image
                    src={`./${priorityIconLightThemeMap[ticket.priority]}.svg`}
                    alt="priority"
                    width="30"
                    height="30"
                    className="dark:hidden border-[2px] p-[1px] border-[#e6e7eb]"
                />
                <Image
                    src={`./${priorityIconDarkThemeMap[ticket.priority]}.svg`}
                    alt="priority"
                    width="25"
                    height="25"
                    className="hidden dark:block border-[2px] p-[1px] border-[#e6e7eb] dark:border-[#4a4a4a]"
                />
                <div className="ml-3 w-[135px] flex items-center justify-between border-[2px] px-[2px] border-[#e6e7eb] dark:border-[#4a4a4a]">
                    <Image
                        src="./circle.svg"
                        alt="tag"
                        width="15"
                        height="15"
                    />
                    <span className="text-[#8D8D8D] text-sm">{ticket.tag[0]}</span>
                </div>
            </div>
        </div>
    );
}
 
export default UserTile;