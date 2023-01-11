import React, { useState } from 'react'

const Otp = () => {
    const [otp, setotp] = useState(second)

    const handleChange = (e) => {
        setotp(e.target.value)
    }
  return (
    <div className="auth-inner">
      <form onSubmit={handleSubmit}>
        <h3>Verify Otp</h3>
        <div className="mb-3">
          <label>Otp</label>
          <input
            type="text"
            name="name"
            value={otp}
            onChange={handleChange}
            className="form-control"
            placeholder="Name"
          />
        </div>
        
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Verify
          </button>
        </div>
        
      </form>
    </div>
  )
}

export default Otp