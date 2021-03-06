import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import ReviewsContainer from './reviews_container';
import GreetingContainer from '../greeting/greeting_container';
import Minisearch from './mini_search';

class BusinessShow extends React.Component {
    constructor(props) {
        super(props);
    
        this.searchLocation = this.props.searchLocation;
    }
    

    componentDidMount(){
        
        this.props.fetchBusiness(this.props.businessId).then( 
            (business) => this.setState({business: business})
        );
        
        
    }

    render() {
        
        let business = this.props.business;
        if (!business) return null;
        let buttonLink = `/biz/${this.props.businessId}/review`;


        let businessPictures = null;
        if (business.pictures) {
            businessPictures = <>  
                <img className="show-image-container" src={business.pictures[0]} />
                <img className="show-image-container" src={business.pictures[1]} /> 
            </>
        } 

        let averageRating = Math.floor(business.average_rating * 2)
        const reviews = this.props.reviews.map(review => {
            return (
                <ReviewsContainer key={review.id} review={review} />
            )
        })

        return (
            <div>
                
            
              
                <div className="login-header-index">
                    <div className="login-header-mid-two">
                        <Link to={'/'}>
                            <img className="login-logo" src="https://i.imgur.com/O22tB8P.png" />
                        </Link>
                        <Minisearch searchLocation={this.searchLocation} history={this.props.history} />
                    </div>
                    <div className="right-nav-show">
                        <div className="right-nav-three">
                            <GreetingContainer />
                        </div>
                    </div>
                </div>
                <div className="index-tab-bar"></div>
                <div className="show-title-center">
                    <div className="show-title">
                        <div className="show-title-body">
                            <div className="show-title-name">{business.name}</div>
                            <div className="show-stars-review-count">
                                <img className={`stars-large-${averageRating}` + ' stars-large'} src="https://i.imgur.com/UkZkm0D.png" />
                                <p> {this.props.reviews.length} reviews </p>
                            </div>
                            <div className="show-price" >{business.price}</div>
                        </div>
                        <div className="review-background">
                            <Link to={buttonLink}> <button id="write-button">Write A Review</button></Link>
                        </div>
                    </div>
                </div>
                <div className="show-pictures">
                    <div className="show-info-container">
                        <img className="show-map" src="https://i2.wp.com/www.maproomblog.com/xq/wp-content/uploads/2019/03/shadrach-westeros.jpg?resize=840%2C449&ssl=1" />
                        <div className="show-biz-info">
                            <div><img id="icn" src="http://simpleicon.com/wp-content/uploads/castle.png"/>  {business.address}</div>
                            <div>{business.location}</div>
                        </div>
                    </div>
                    <div className="show-image-whole-container">
                        <img className="show-image-container" src={business.photo} />
                        {businessPictures}
                    </div>
                </div>

                <div className="show-review-div">
                  
                    <div>
                        <div className="reviews-header">
                            <div className="rec-reviews">Recommended Reviews </div>
                            <span className="name-reviews"> for {this.props.business.name}</span>  
                        </div>
                        
                        <ul>
                            {reviews}
                        </ul>
                    </div>
                    
                    <Sidebar />
                </div>
            </div>
        )
    }

}

export default BusinessShow;

