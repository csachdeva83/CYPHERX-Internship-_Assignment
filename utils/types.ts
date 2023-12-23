export interface IUser extends IUserNameAvailabile{
    id: string;
}

export interface IUserNameAvailabile {
    name: string;
    available: boolean;
}

export interface IUserNameAvailabeTicket extends ITicket {
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

export type TSupport = {
    tickets: ITicket[]
    users: IUser[]
}

export interface IGroupUser {
    [userId: string] : IUserNameAvailabeTicket[]; 
}

export interface IGroupStatus {
    [status: string] : IUserNameAvailabeTicket[]; 
}

export interface IGroupPriority {
    [priority: string] : IUserNameAvailabeTicket[]; 
}

export type TGroupSupport = {
    groupUser: IGroupUser;
    groupStatus: IGroupStatus;
    groupPriority: IGroupPriority;
}

export type TGroup = "user" | "status" | "priority";