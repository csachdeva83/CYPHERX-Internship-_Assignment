import { priorityIconDarkThemeMap, priorityIconLightThemeMap, statusIconDarkThemeMap, statusIconLightThemeMap } from "@/utils/icon-map";
import { priorityNumberMap } from "@/utils/priority-map";
import { IGroupPriority, IGroupStatus, IGroupUser, IUserNameAvailabeTicket, TGroup, TOrder } from "@/utils/types";
import Image from "next/image";
import { useReadLocalStorage } from "usehooks-ts";
import PriorityTile from "./tiles/priority-tile";
import StatusTile from "./tiles/status-tile";
import UserTile from "./tiles/user-tile";
import UserLogo from "./user-logo";

interface ITileWrapperProps {
    groupedData: IGroupUser | IGroupStatus | IGroupPriority;
    tile: typeof StatusTile | typeof PriorityTile | typeof UserTile ;
}

const TileWrapper = ({groupedData, tile: Tile}: ITileWrapperProps) => {

    const groupBy = useReadLocalStorage<TGroup>("groupBy");
    const orderBy = useReadLocalStorage<TOrder>("orderBy");

    if(orderBy === 'priority'){
        for(const key in groupedData){
            if(groupedData.hasOwnProperty(key)){
                groupedData[key].sort((ticketA: IUserNameAvailabeTicket,ticketB: IUserNameAvailabeTicket) => ticketB.priority - ticketA.priority);
            }
        }
    }else{
        for(const key in groupedData){
            if(groupedData.hasOwnProperty(key)){
                groupedData[key].sort((ticketA: IUserNameAvailabeTicket,ticketB: IUserNameAvailabeTicket) => {
                    const titleA = ticketA.title.toLowerCase();
                    const titleB = ticketB.title.toLowerCase();
                    if (titleA < titleB) {
                        return -1;
                    }
                    if (titleA > titleB) {
                        return 1;
                    }
                    return 0;
                });
            }
        }
    }

    return (
        <>
            {
                Object.keys(groupedData).map((key: string) => (
                    <div key={key} className=" w-fit h-fit mr-4">
                        <div className="flex items-center justify-between mb-7">
                            <div className="flex items-center justify-between max-w-max">
                                {
                                    groupBy === 'user' && (
                                        <>
                                            <UserLogo userName={groupedData[key][0].name} available={groupedData[key][0].available} />
                                            <span className="text-base font-medium mx-2">{groupedData[key][0].name}</span>
                                            <span className="text-[#8D8D8D]">{groupedData[key].length}</span>
                                        </>
                                    )
                                }
                                {
                                    groupBy === 'status' && (
                                        <>
                                            <Image
                                                src={`./${statusIconLightThemeMap[key]}.svg`}
                                                alt="priority"
                                                width="30"
                                                height="30"
                                                className="dark:hidden p-[1px]"
                                            />
                                            <Image
                                                src={`./${statusIconDarkThemeMap[key]}.svg`}
                                                alt="priority"
                                                width="25"
                                                height="25"
                                                className="hidden dark:block p-[1px]"
                                            />
                                            <span className="text-base font-medium mx-2 capitalize">{key}</span>
                                            <span className="text-[#8D8D8D]">{groupedData[key].length}</span>
                                        </>
                                    )
                                }
                                {
                                    groupBy === 'priority' && (
                                        <>
                                            <Image
                                                src={`./${priorityIconLightThemeMap[key]}.svg`}
                                                alt="priority"
                                                width="30"
                                                height="30"
                                                className="dark:hidden p-[1px]"
                                            />
                                            <Image
                                                src={`./${priorityIconDarkThemeMap[key]}.svg`}
                                                alt="priority"
                                                width="25"
                                                height="25"
                                                className="hidden dark:block p-[1px]"
                                            />
                                            <span className="text-base font-medium mx-2 capitalize">{priorityNumberMap[key]}</span>
                                            <span className="text-[#8D8D8D]">{groupedData[key].length}</span>
                                        </>
                                    )
                                }
                            </div>
                            <div className="flex items-center">
                                <Image
                                    src="./plus.svg"
                                    alt="plus"
                                    width="13"
                                    height="13"
                                    className="cursor-pointer mr-2"
                                />
                                <Image
                                    src="./dots.svg"
                                    alt="dots"
                                    width="15"
                                    height="15"
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>
                        {
                            groupedData[key].map((ticket: IUserNameAvailabeTicket) => (
                                <Tile key={ticket.id} ticket={ticket} />
                            ))
                        }
                    </div>
                )) 
            }
        </>
    );
}
 
export default TileWrapper;