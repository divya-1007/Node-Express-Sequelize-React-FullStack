import React ,{useEffect,useState} from 'react';
import axios from 'axios';


export const Customer = () => {
    const [products, setProducts] = useState([])
   

    useEffect(() => {
        
        const getProductsData = async () => {
            const { data } = await axios.get('/api/products/paymentList' ,)
            setProducts(data?.data?.items)
        }
        getProductsData()
    }, [])

  return (
    <div className="customers">
    <div className="card">
        <div className="card-header">
            <h3 className="heading">New customer</h3>
            <button>Sell all<span className="fas fa-arrow-right"></span></button>
        </div>

        <div className="card-body">
        { products.map(product => {
            <div className="customer">
                <div className="info">
                <h4>{product.id}</h4>
                    {/* <img src="https://assets.codepen.io/3853433/internal/avatars/users/default.png?format=auto&version=1617122449&width=40&height=40"
                        alt=""/> */}
                    <div>
                        <h4>
                            {product.entity}</h4>
                        <small>{product.amount_paid}</small>
                    </div>
                </div>
                <div className="contact">
                    <span className="fas fa-user-circle">{product.currency}</span>
                    <span className="fas fa-comment">{product.status}</span>
                    {/* <span className="fas fa-phone">{product}</span> */}
                </div>
            </div>
            })
        }
            {/* <div className="customer">
                <div className="info">
                    <img src="https://assets.codepen.io/3853433/internal/avatars/users/default.png?format=auto&version=1617122449&width=40&height=40"
                        alt="" />
                    <div>
                        <h4>Ion Emusky</h4>
                        <small>C0O @ AFK</small>
                    </div>
                </div>
                <div className="contact">
                <span className="fas fa-user-circle"></span>
                <span className="fas fa-comment"></span>
                <span className="fas fa-phone"></span>
                </div>
            </div>

            <div className="customer">
                <div className="info">
                    <img src="https://assets.codepen.io/3853433/internal/avatars/users/default.png?format=auto&version=1617122449&width=40&height=40"
                        alt="" />
                    <div>
                        <h4>El-lion musky</h4>
                        <small>CEO @ FOMO</small>
                    </div>
                </div>
                <div className="contact">
                <span className="fas fa-user-circle"></span>
                <span className="fas fa-comment"></span>
                <span className="fas fa-phone"></span>
                </div>
            </div>

            <div className="customer">
                <div className="info">
                    <img src="https://assets.codepen.io/3853433/internal/avatars/users/default.png?format=auto&version=1617122449&width=40&height=40"
                        alt=""/>
                    <div>
                        <h4>John Bezos</h4>
                        <small>CEO @ Mazon</small>
                    </div>
                </div>
                <div className="contact">
                    <span className="fas fa-user-circle"></span>
                    <span className="fas fa-comment"></span>
                    <span className="fas fa-phone"></span>
                </div>
            </div>

            <div className="customer">
                <div className="info">
                    <img src="https://assets.codepen.io/3853433/internal/avatars/users/default.png?format=auto&version=1617122449&width=40&height=40"
                        alt="" />
                    <div>
                        <h4>Beelz Gai8</h4>
                        <small>CEO @ Mycroft</small>
                    </div>
                </div>
                <div className="contact">
                    <span className="fas fa-user-circle"></span>
                    <span className="fas fa-comment"></span>
                    <span className="fas fa-phone"></span>
                </div>
            </div>

            <div className="customer">
                <div className="info">
                    <img src="https://assets.codepen.io/3853433/internal/avatars/users/default.png?format=auto&version=1617122449&width=40&height=40"
                        alt="" />
                    <div>
                        <h4>Jeam Krook</h4>
                        <small>CEO @ Penapple</small>
                    </div>
                </div>
                <div className="contact">
                    <span className="fas fa-user-circle"></span>
                    <span className="fas fa-comment"></span>
                    <span className="fas fa-phone"></span>
                </div>
            </div>

            <div className="customer">
                <div className="info">
                    <img src="https://assets.codepen.io/3853433/internal/avatars/users/default.png?format=auto&version=1617122449&width=40&height=40"
                        alt="" />
                    <div>
                        <h4>Cris Coya</h4>
                        <small>CEO @ PenCode</small>
                    </div>
                </div>
                <div className="contact">
                    <span className="fas fa-user-circle"></span>
                    <span className="fas fa-comment"></span>
                    <span className="fas fa-phone"></span>
                </div>
            </div> */}

        </div>
    </div>
</div>
  )
}
