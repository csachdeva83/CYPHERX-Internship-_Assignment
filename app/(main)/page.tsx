"use client"

import { ITicket, IUser, IUserNameAvailabeTicket, IUserNameAvailabile, TGroup, TGroupSupport, TSupport } from "@/utils/types";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from 'usehooks-ts';
import TileWrapper from "./_components/tile-wrapper";
import PriorityTile from "./_components/tiles/priority-tile";
import StatusTile from "./_components/tiles/status-tile";
import UserTile from "./_components/tiles/user-tile";

const MainPage = () => {

    const [groupedData, setGroupedData] = useState<TGroupSupport>({ groupUser: {}, groupStatus: {}, groupPriority: {} });
    const groupBy = useReadLocalStorage<TGroup>("groupBy");

    useEffect(() => {
        const getData = () => {
            
            fetch(process.env.NEXT_PUBLIC_TICKETS_AND_USERS_URL as string, {
                next: {
                    revalidate: 10 
                }
            })
            .then((res) => res.json())
            .then((data: TSupport) => {
                const groupNameAvailability = data.users.reduce((grouped: {
                    [userId in string]: IUserNameAvailabile
                }, user: IUser) => {
                    let {id, name, available} = user;
            
                    id = id.toLowerCase();
                    if(!grouped[id]){
                        grouped[id] = {
                            name,
                            available
                        };
                    }
            
                    return grouped;
                }, {});
            
                const groupedData = data.tickets.reduce((grouped: TGroupSupport, ticket: ITicket) => {
                    let {userId, status, priority} = ticket;
            
                    const newTicket: IUserNameAvailabeTicket = {
                        ...ticket,
                        ...groupNameAvailability[ticket.userId]
                    };
            
                    // Group by userId
                    userId = userId.toLowerCase();
                    if(!grouped.groupUser[userId]) grouped.groupUser[userId] = [];
                    grouped.groupUser[userId].push(newTicket);
            
                    // Group by status
                    status = status.toLowerCase();
                    if(!grouped.groupStatus[status]) grouped.groupStatus[status] = [];
                    grouped.groupStatus[status].push(newTicket);
            
                    // Group by priority
                    if(!grouped.groupPriority[priority]) grouped.groupPriority[priority] = [];
                    grouped.groupPriority[priority].push(newTicket);
            
                    return grouped;
                },
                { groupUser: {}, groupStatus: {}, groupPriority: {} });


                setGroupedData(groupedData);
            })

        };

        return () => getData();
    }, [])

    return (
        <div className="w-full h-full flex items-start justify-start flex-wrap gap-y-10">
            {
                groupBy === 'priority' && (
                    <TileWrapper groupedData={groupedData.groupPriority} tile={PriorityTile} />
                )
            }
            {
                groupBy === 'status' && (
                    <TileWrapper groupedData={groupedData.groupStatus} tile={StatusTile} />
                )
            }
            {
                groupBy === 'user' && (
                    <TileWrapper groupedData={groupedData.groupUser} tile={UserTile} />
                )
            }
        </div>
    );
}

export default MainPage;