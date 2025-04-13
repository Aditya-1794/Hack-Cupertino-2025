import '../pages/OurMission.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/ui/Login';
import { TbRecycle } from 'react-icons/tb';

function OurMission() {
  return (
    <>
      <div className='header'>
            <h1 className='logo'><div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '10px'}}><span><TbRecycle /> </span>Upcycle</div></h1>
            <div className='menubar'>
                <Link to="/"><h2 className='menuBarHome' style={{fontWeight: "bold", fontSize: "1.4rem", marginTop:"-12px", marginLeft: "20px"}}>Home</h2></Link>
                <Link to="/SavedCrafts"><h2 className='menuBarHome' style={{fontWeight: "bold", fontSize: "1.4rem", marginTop:"-12px", marginLeft: "20px"}}>Saved Crafts</h2></Link>
                <Link to="/OurMission"><h2 className='menuBarHome' style={{fontWeight: "bold", fontSize: "1.4rem", marginTop:"-12px", marginLeft: "20px"}}>Our Mission</h2></Link>
                
                <Login></Login>
            </div>
        </div>

      <div className="mission">
        <h2 className = "missionHeader">Our Mission</h2>
        <p className = "missionText">
          At Upcycle, we are dedicated to promoting sustainability and environmental consciousness through innovative upcycling solutions. Our mission is to transform waste materials into valuable products, reducing landfill waste and conserving natural resources. We aim to inspire individuals and communities to embrace the principles of upcycling, fostering a culture of creativity and responsibility towards our planet.
        </p>
        <p  className = "missionText">
          We believe that every item has the potential for a second life, and we strive to empower people to see the beauty in repurposing. By providing resources, education, and a platform for upcyclers, we aim to create a global community that champions sustainable practices and encourages mindful consumption.
        </p>
        <p className = "missionText">
          Join us in our mission to make the world a cleaner, greener place. Together, we can turn waste into wonder and inspire a movement towards a more sustainable future.
        </p>
        <p className = "missionText">
          Thank you for being a part of our journey towards a more sustainable world!
        </p>
        <p className = "missionText">
          Let's work together to make a positive impact on our planet, one upcycled creation at a time.
        </p>
        <p className = "missionText">
          If you have any questions or would like to learn more about our mission, please feel free to reach out to us.
        </p>
        <p className = "missionText">
          Together, we can make a difference!
        </p>
        <p className = "missionText">
          Sincerely,<br />
          The Upcycle Team(Aditya Jha, Arav Bansal, Aishani Bansal)
        </p>
      </div>
    </>
  );
}

export default OurMission;