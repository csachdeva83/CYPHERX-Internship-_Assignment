interface IUser {
    id: string;
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

export const getData = async (): Promise<TSupport> => {
    const res = await fetch(process.env.TICKETS_AND_USERS_URL as string, {
        next: {
            revalidate: 10 
        }
    });
    const data: TSupport = await res.json();
    return data;
};



const MainPage = async () => {

    const data = await getData();

    return (
        <div>
            {
                data.tickets.map((ticket: ITicket) => (
                    <div key={ticket.id}>{ticket.title}</div>
                ))
            }
        </div>
    );
}

export default MainPage;