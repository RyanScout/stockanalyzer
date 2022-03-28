import React from "react"
import "./navigation.css"

export function Navbar(props){
    return(
        <nav className = "custom-navbar">
        <ul className = "custom-navbar-nav">{props.children}</ul>
        </nav>
    )
}

export function NavItem(props){
    return(
        <li className = "custom-nav-item">
            <a href = {props.link} className = "custom-icon-button">
                {props.icon}
            </a>
        </li>
    )
}