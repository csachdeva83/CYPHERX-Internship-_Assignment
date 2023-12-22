import { ReactNode } from "react";
import Navbar from "./_components/navabar";

const MainLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className="h-full">
            <div className="h-[var(--navbar-height)]">
                <Navbar/>
            </div>
            <main className="h-[calc(100vh-var(--navbar-height))] bg-[#F4F5F8]">
                {children}
            </main>
        </div>
    );
}
 
export default MainLayout;