import React from 'react';
import corvette from '../../images/Corvette.webp'
import family from '../../images/JorgeAndLaurie0.webp'
import boat from '../../images/boat.jpg'
import Carousel from 'react-multi-carousel';
// import '../App.css';
export default function About(){
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
        <>
        <div className='aboutHero'>
            <img alt="family"src={boat}/>  
            <h1>About Jorge</h1>          
        </div>
        <p className='aboutIntro'>"As a Real Estate Agent at the Top of the field, my goals are to have my clients become
        successful in the selling or purchasing of their next investment or property. To help my
        clients in the buying and selling process, I provide the tools to make educated choices with
        their investments, whether that be a vacant lot or a new home. Success is measured in the excitement my clients get when they close on their new
        property. When they succeed, I also do. Success for everyone is in the relationships we build. I reach out to all my clients
        as if they were my neighbors. We'll all grow in our business relationship and make a new friend.
        Let's make the move together."</p>
        <hl></hl>
        <div className="About-sections">
            <div className="About-container">
                <img src={corvette} className="About-pic"/>
                <div className="About-text-container">
                    <h1>Well Traveled</h1>
                    <p className="About-text">Jorge is more than just a man behind a desk making calls: Jorge is well traveled and can tell you what you need to know about the area you want
                        to move in to. In his 2001 C5 Corvette, Jorge has traveled around the state and has the experience you NEED to make a great move.</p>
                </div>
            </div>
            <div className="About-container">
                <div className="About-text-container">
                    <h1>Family Man</h1>
                    <p className="About-text">Jorge is a family man that understands the urgency and difficulty associated with relocating your family, and will do everything in his power 
                    to get you into the home that will make you and your family happy! Moving your family can be a difficult and stressful process. You'll feel a peace of mind knowing
                    that you've got a friend like Jorge who understand what you're going through and knows how to help you. </p>
                </div>
                <img src={family}/>
            </div>
            <h1 style={{'font-size': '60px', 'margin-bottom': '10px'}}>See What People Say About Jorge</h1>
            <Carousel className='reviewCarousel' responsive={responsive} showDots={true} draggable={false} infinite={true}>
                <div className='review'>
                    <h1>Gili</h1>
                    <p>"Jorge made the process simple and easy. Very professional, great personality,
                    honest, patience, great communication regularly through the whole process! His
                    insight to me was extremely valuable, very helpful! I would highly recommend Jorge!"</p>
                </div>
                <div className='review'>
                    <h1>Quinto</h1>
                    <p>Jorge is an extremely knowledgable real estate agent, well versed in all aspects of
                    the sale. Throughout the entire process, Jorge responded quickly to my calls and
                    had answers for any concerns. He kept me updated and helped me make some
                    major decisions. I would highly recommend Jorge Sousa to anyone looking for a
                    competent and dedicated agent.</p>
                </div>
            </Carousel>
        </div>
        </>
    )
}