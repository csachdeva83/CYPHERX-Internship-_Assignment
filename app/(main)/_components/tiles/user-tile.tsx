import { ITicket } from "../../page";

const UserTile = ({ ticket }: {ticket: ITicket}) => {

    return (
        <div className="w-80 h-28 bg-white px-5 py-3 rounded-md shadow-[0_0_8px_0_#0000001a]">
            <span>{ticket.id}</span>
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path></svg>
            <span>{ticket.title}</span>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>
            <span>{ticket.tag[0]}</span>
        </div>
    );
}
 
export default UserTile;