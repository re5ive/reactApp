/**
 * created @ 3/20/2019 10:17 AM
 * with WebStorm
 * by Mohamed RIHAN <rihan.info@gmail.com>
 * for tnexus-ui-beta-3
 */

import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {

    let baseName=''
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        baseName = ''
    } else {
        baseName = ''
    }
    return (
        <nav className="admin--menu">
            <ul>
                <li><NavLink to={`${baseName}/about`} activeClassName="admin--active">
                    <i className="sapUiIcon si-profile um-assign" style={{ color: '#FFF', width: '17px', height: '20px' }} aria-hidden="true" /> About</NavLink>
                </li>
                <li><NavLink to={`${baseName}`} activeClassName="admin--active">
                    <i className="sapUiIcon si-normal-user um-assign" style={{ color: '#FFF', width: '17px', height: '20px' }} aria-hidden="true" /> Home</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Header
