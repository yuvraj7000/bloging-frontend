import Navbar from "./nav"
import Footer from "./footer"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return(
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}