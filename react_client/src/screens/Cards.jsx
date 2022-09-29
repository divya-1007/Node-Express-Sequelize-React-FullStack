import React from 'react'

export const Cards = () => {
  return (
    <div className="cards">
        <div className="card-single">
            <div>
                <h1 id="customer"></h1>
                <span>Happy Clients</span>
            </div>
            <div>
                <span className="fas fa-users"></span>
            </div>
        </div>
        <div className="card-single">
            <div>
                <h1 id="project"></h1>
                <span>Projects Done!</span>
            </div>
            <div>
                <span className="fas fa-clipboard"></span>
            </div>
        </div>
        <div className="card-single">
            <div>
                <h1 id="order"></h1>
                <span>Confirmed Orders</span>
            </div>
            <div>
                <span className="fas fa-shopping-bag"></span>
            </div>
        </div>
        <div className="card-single">
            <div>
                <h1><sup>$</sup>
                    <p id="income"><b>k</b></p>
                </h1>
                <span>weekly Income</span>
            </div>
            <div>
                <span className="fab fa-google-wallet"></span>
            </div>
        </div>
    </div>
  )
}
