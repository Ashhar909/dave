import SignedInLinks from '../auth/SignedInLinks';
import SignedOutLinks from '../auth/SignedOutLinks';
import { connect} from 'react-redux';

function Navbar(props) {
  return (
  <div className="container">
      <nav className={`navbar navbar-expand-lg navbar-light bg-light ${props.auth.token? "" :"d-flex justify-content-end"}`} style={{borderRadius:"0px 0px 20px 20px", padding:"15px 100px"}}>
        {props.auth.token ? <SignedInLinks/> :<SignedOutLinks/>}
      </nav>
      </div>
  );
}

const mapStateToprops = (state) => {
  return{
    auth:state.auth
  }
}

export default connect(mapStateToprops)(Navbar);
