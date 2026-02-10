import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
    return (
        <div className="m-0 w-screen min-h-screen box-border flex flex-col bg-stone-100 text-base md:text-lg lg:text-xl overflow-auto">
            <Header />
            <main className="grow flex justify-center items-center">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}