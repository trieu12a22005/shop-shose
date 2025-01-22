import {Outlet, Link} from "react-router-dom"
import "./style.scss"
import { IoCartOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { RxDiscordLogo } from "react-icons/rx";
function LayoutDefault()
{
    return (
        <>
            <div className = "layout-default">
            <header className = "layout-default__header">
            <div className = "layout-default__Home">
            <Link to="/" className="layout-default__Link">Home</Link>
            </div>
            <div className="layout-default__Contact">
            <Link to="/contact" className="layout-default__Link">Contact</Link>
            </div>
            <div className="layout-default__About">
            <Link to="/about" className="layout-default__Link">About</Link>
            </div>
            <div className="layout-default__Sign-Up">
            <Link to="/SignUp" className="layout-default__Link">SignUp</Link>
            </div>
            <div className="layout-default__cart">
            <Link to="/cart" className="layout-default__cart">
            <i><IoCartOutline /></i>
            </Link>
            </div>
            <div className="layout-default__detail">
            <Link to="/detail" className="layout-default__Link"></Link>
            </div>
            </header>
            <main className="layout-default__main">
                <Outlet/>
            </main>
            <footer className="layout-default__footer">
                <div >
                <h3 className="layout-default__title">Contact with Us</h3>
                <a href="https://www.facebook.com/" className="layout-default__social"><FaFacebook /></a>
                <a href="https://www.instagram.com/" className="layout-default__social"><FaInstagram /></a>
                <a href="https://discord.com/" className="layout-default__social"><RxDiscordLogo /></a>
                </div>
            </footer>
            </div>
        </>
    )
}
export default LayoutDefault