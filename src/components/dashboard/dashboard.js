import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const sidemenu = [
        {
            id: 1,
            menu_name: "Home"
        },
        {
            id: 2,
            menu_name: "Users"
        },
        {
            id: 3,
            menu_name: "Projects"
        }
    ];


    // today date
    // const currDate = new Date();
    //    const currDate = new Date().toLocaleString();
    const currDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', weekday: 'long' });




    return (
        <div>
            <header>
                <h2>Cities</h2>
            </header>

            <section>
                <nav>
                    <ul>


                        {
                            sidemenu.map(item => {
                                return <li key={item.id}><a href="#">{item.menu_name}</a></li>;
                            })
                        }

                    </ul>
                </nav>

                <article>
                    <h1>Home</h1>
                    <p>{currDate}</p>

                    <div className='d-flex'>
                        <div className='card p-4 rounded-pill'>
                          <Link to={'/projects/projectsList'}>  5 Projects </Link>
                        </div>
                        <div className='card p-4 rounded-pill ms-4'>
                           <Link to={'/users/usersList'} > 5 Users </Link>
                        </div>
                    </div>



                </article>
            </section>

            <footer>
                <p>Footer</p>
            </footer>
        </div>
    )
};

export default Dashboard;

