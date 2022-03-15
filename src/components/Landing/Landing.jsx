import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import About from '../About/About';
import Technologies from '../Technologies/Technologies';
import Student from '../Student/Student';
import Footer from '../Footer/Footer';

function Landing(props) {

  return (
      <div className="landing">
        <Header 
          loggedIn={props.loggedIn}
        />
        <Navigation />
        <About />
        <Technologies />
        <Student />
        <Footer />
      </div>
  );
}

export default Landing;