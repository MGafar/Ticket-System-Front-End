import React, { Component } from 'react';

class BannerComponent extends Component {
    render() {
        return (
            <div className="ticket-banner">
                <header>
                    <nav className= "navbar navbar-expand-md navbar-dark bg-dark">
                        <div>
                            <a className="navbar-brand" href="./"> 
                                Ticket System
                            </a>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default BannerComponent;