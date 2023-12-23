import Image from "next/image";
import UserTile from "./_components/tiles/user-tile";
import UserLogo from "./_components/user-logo";

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
        <div className="w-full h-full flex items-start justify-start flex-wrap">
            {
                Object.keys(groupedData.groupUser).map((key: string) => (
                    <div key={key} className=" w-fit h-fit mr-4">
                        <div className="flex items-center justify-between mb-7">
                            <div className="flex items-center justify-between max-w-max">
                                <UserLogo userName={groupedData.groupUser[key][0].name} available={groupedData.groupUser[key][0].available} />
                                <span className="text-base font-medium mx-2">{groupedData.groupUser[key][0].name}</span>
                                <span className="text-[#8D8D8D]">{groupedData.groupUser[key].length}</span>
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
                            groupedData.groupUser[key].map((ticket: IUserNameAvailabeTicket) => (
                                <UserTile key={ticket.id} ticket={ticket} />
                            ))
                        }
                    </div>
                )) 
            }
        </div>
    );
}

export default MainPage;