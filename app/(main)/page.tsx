import PriorityTile from "./_components/tiles/priority-tile";
import StatusTile from "./_components/tiles/status-tile";
import UserTile from "./_components/tiles/user-tile";

interface IUser extends IUserNameAvailabile{
    id: string;
}

interface IUserNameAvailabile {
    name: string;
    available: boolean;
}

export interface IUserNameAvailabeTicket extends ITicket {
    name: string;
    available: boolean; 
}

interface ITicket {
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
        [userId in string] : IUserNameAvailabeTicket[]; 
    },
    groupStatus: {
        [status in string] : IUserNameAvailabeTicket[];
    };
    groupPriority: {
        [priority in string] : IUserNameAvailabeTicket[];
    };
}

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

    const groupedData = await getData();

    return (
        <div>
            <UserTile ticket={groupedData.groupUser?.['usr-4']?.[0]} />
            <StatusTile ticket={groupedData.groupStatus?.['todo']?.[2]} />
            <PriorityTile ticket={groupedData.groupPriority?.['3']?.[1]} />
        </div>
    );
}

export default MainPage;