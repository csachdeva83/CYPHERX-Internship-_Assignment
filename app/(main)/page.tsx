import UserTile from "./_components/tiles/user-tile";

interface IUser {
    id: string;
    name: string;
    available: boolean;
}

export interface ITicket {
    id: string;
    title: string;
    tag: string[];
    userId: string;
    status: string;
    priority: number;

}

type TSupport = {
    tickets: ITicket[]
    users: IUser[]
}

type TGroupSupport = {
    groupUser: {
        [userId in string] : ITicket[]; 
    },
    groupStatus: {
        [status in string] : ITicket[];
    };
    groupPriority: {
        [priority in string] : ITicket[];
    };
}

export const getData = async (): Promise<TGroupSupport> => {
    const res = await fetch(process.env.TICKETS_AND_USERS_URL as string, {
        next: {
            revalidate: 10 
        }
    });

    const data: TSupport = await res.json();

    const groupedData = data.tickets.reduce((grouped: any, ticket: ITicket) => {
        const {userId, status, priority} = ticket;

        // Group by userId
        if(!grouped.groupUser[userId]) grouped.groupUser[userId] = [];
        grouped.groupUser[userId].push(ticket);

        // Group by status
        if(!grouped.groupStatus[status]) grouped.groupStatus[status] = [];
        grouped.groupStatus[status].push(ticket);

        // Group by priority
        if(!grouped.groupPriority[priority]) grouped.groupPriority[priority] = [];
        grouped.groupPriority[priority].push(ticket);

        return grouped;
    },
    { groupUser: {}, groupStatus: {}, groupPriority: {} });
    
    return groupedData;
};



const MainPage = async () => {

    const groupedData = await getData();

    return (
        <div>
            <UserTile ticket={groupedData.groupUser['usr-4'][0]} />
        </div>
    );
}

export default MainPage;