import { ITicket, IUser, IUserNameAvailabeTicket, IUserNameAvailabile, TGroupSupport, TSupport } from "@/utils/types";
import TileWrapper from "./_components/tile-wrapper";
import StatusTile from "./_components/tiles/status-tile";

export const getData = async (): Promise<TGroupSupport> => {
    const res = await fetch(process.env.TICKETS_AND_USERS_URL as string, {
        next: {
            revalidate: 10 
        }
    });

    const data: TSupport = await res.json();

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
    
    return groupedData;
};



const MainPage = async () => {

    const data = await getData();

    return (
        <div className="w-full h-full flex items-start justify-start flex-wrap">
            <TileWrapper groupedData={data.groupStatus} tile={StatusTile} groupBy="status" />
        </div>
    );
}

export default MainPage;