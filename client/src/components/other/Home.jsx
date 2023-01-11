import React, { useEffect } from 'react'
import { connect } from 'react-redux'

const Home = () => {
  useEffect(() => {
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>

    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
