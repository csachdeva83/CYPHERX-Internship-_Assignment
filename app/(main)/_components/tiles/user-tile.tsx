import Image from "next/image";
import { ITicket } from "../../page";

const UserTile = ({ ticket }: {ticket: ITicket}) => {

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

    const priorityIconLightThemeMap: {[priority in string]: string} = {
        '4': 'urgent-priority',
        '3': 'high-priority',
        '2': 'medium-priority',
        '1': 'low-priority',
        '0': 'no-priority'
    };

    const priorityIconDarkThemeMap: {[priority in string]: string} = {
        '4': 'urgent-priority-dark',
        '3': 'high-priority-dark',
        '2': 'medium-priority-dark',
        '1': 'low-priority-dark',
        '0': 'no-priority-dark'
    };

    return (
        <div className="w-80 h-fit flex items-start justify-between flex-col bg-white px-5 py-2 rounded-md shadow-[0_0_8px_0_#0000001a]">
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
                <span className="ml-1">{ticket.title}</span>
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
                    className="hidden dark:block border-[2px] p-[1px] border-[#e6e7eb]"
                />
                <div className="ml-3 w-[135px] flex items-center justify-between border-[2px] px-[2px] border-[#e6e7eb]">
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