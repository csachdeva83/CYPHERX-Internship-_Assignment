import Image from "next/image";
import { IUserNameAvailabeTicket } from "../../page";
import UserLogo from "../user-logo";

const PriorityTile = ({ ticket }: {ticket: IUserNameAvailabeTicket}) => {

    const statusIconLightThemeMap: {[status in string]: string} = {
        'todo': 'todo',
        'in progress': 'in-progress',
        'backlog': 'backlog',
        'done': 'done',
        'cancelled': 'cancelled'
    };

    const statusIconDarkThemeMap: {[status in string]: string} = {
        'todo': 'todo-dark',
        'in progress': 'in-progress',
        'backlog': 'backlog-dark',
        'done': 'done',
        'cancelled': 'cancelled'
    };

    return (
        <div className="w-80 h-fit flex items-start justify-between flex-col bg-white px-5 py-2 rounded-md shadow-[0_0_8px_0_#0000001a]">
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
                <span className="ml-1">{ticket.title}</span>
            </div>
            <div className="mt-1 w-[135px] flex items-center justify-between border-[2px] px-[2px] border-[#e6e7eb]">
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