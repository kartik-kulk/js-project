import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('user');

    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/SignUp')
    }

    return (
        <div className='ButtonBar'>
            {

                auth ? <ul className="Nav-ul"><>
                    <img src='https://media.istockphoto.com/id/1270175651/vector/optical-motion-illusion-vector-background-green-purple-wavy-striped-pattern-move-around-the.jpg?s=612x612&w=0&k=20&c=gDD6BsUe-IjpNipKSeeVzZvcURXVx5I5EFsc58AJiB0=' className='logoPostLogin'/>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/Add">Add Products</Link></li>
                    <li><Link onClick={logout} to="/Login">Log Out ({JSON.parse(auth).fname})</Link></li>
                </></ul>
                    :
                    <ul className='RightButton'><>
                        <img src='https://media.istockphoto.com/id/1270175651/vector/optical-motion-illusion-vector-background-green-purple-wavy-striped-pattern-move-around-the.jpg?s=612x612&w=0&k=20&c=gDD6BsUe-IjpNipKSeeVzZvcURXVx5I5EFsc58AJiB0=' className='logoAtLogin'/>
                        <li><Link to="/SignUp">Sign Up</Link></li>
                        <li><Link to="/Login">Login</Link></li>
                    </>
                    </ul>
            }


        </div>
    )
}
export default Nav;