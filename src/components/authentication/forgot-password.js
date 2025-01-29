import React, { useState } from "react";

const ForgotPassword = () => {
  const [visibleDiv, setVisibleDiv] = useState(1);

 
  const toggleDiv = (e) => {
    e.preventDefault(); 
    setVisibleDiv((prevDiv) => (prevDiv % 3) + 1); 
  };

  return (
    <div className="login-container">
      {/* First Form: Email Input */}
      {visibleDiv === 1 && (
        <form>
          <h3 className="text-center">Forgot Password</h3>
          <p className="text-center font-sm">Please enter your Email Id to continue</p>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary w-100" onClick={toggleDiv}>
            Submit
          </button>
        </form>
      )}

      {/* Second Form: OTP Input */}
      {visibleDiv === 2 && (
        <form>
          <h3 className="text-center">Forgot Password</h3>
          <p className="text-center font-sm">Please enter your OTP to continue</p>
          <div className="mb-3">
            <label className="form-label">Enter OTP</label>
            <input type="text" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary w-100" onClick={toggleDiv}>
            Submit
          </button>
        </form>
      )}

      {/* Third Form (if different from the second) */}
      {visibleDiv === 3 && (
        <form>
          <h3 className="text-center">Forgot Password</h3>
          <p className="text-center font-sm">Please enter your new password</p>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary w-100" onClick={toggleDiv}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
