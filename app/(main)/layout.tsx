import { ReactNode } from "react";
import Navbar from "./_components/navabr";

const MainLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className="h-full">
            <div className="h-[var(--navbar-height)]">
                <Navbar/>
            </div>
            <main className="h-[calc(100vh-var(--navbar-height))] bg-cyan-200">
                {children}
            </main>
        </div>
    );
}
 
export default MainLayout;