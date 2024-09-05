import React, { useContext, useState } from 'react'
import SmallSpinner from "./SmallSpinner"
import BASE_URL from '../../hooks/baseURL';
import authCheck from '../../hooks/authCheck';
import { AuthContext } from '../../contexts/AuthContext';

const ChangePassword = () => {
  authCheck();
  const { content } = useContext(AuthContext)
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const changePassword = (e) => {
    e.preventDefault();
    setLoading(true);
    const inputData = {
      "current_password": current,
      "password": password,
      "password_confirmation": confirm
    }
    fetch(BASE_URL + "/changePassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(inputData),
    })
      .then(async (response) => {
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
          if (response.status === 422) {
            setLoading(false)
            setError(errorData.errors);
            setSuccess("");
            setErrMsg("")
            console.error(`${response.status}:`, errorData);
            
          } else if (response.status === 401) {
            setLoading(false)
            setErrMsg(errorData.message);
            setSuccess("");
            setError("")
            console.error(`${response.status}:`, errorData);
          } else {
            console.error(`Unexpected error with status ${response.status}`);
          }
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setLoading(false);
        setSuccess("New Password Changed Successfully.");
        setErrMsg("")
        setError("")
        setCurrent("");
        setPassword("");
        setConfirm("");
      })
      .catch((error) => {
        console.error(error);
      });

  }


  return (
    <div>
      <form className="profileForm mb-5 px-3 mt-4 py-4 rounded-4" onSubmit={changePassword}>
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold mb-3">{content?.profile?.change_password}</h5>
          <div>
            {success && (
              <div className="alert alert-success alert-dismissible" role="alert">
                {success}
              </div>
            )}
            {errMsg && (
              <div className="alert alert-danger alert-dismissible" role="alert">
                {errMsg}
              </div>
            )}
          </div>
        </div>
         <div className="row mb-2">
            <div className="profileTitle col-5 mt-2">{content?.profile?.old_password}  : </div>
            <div className="col-7">
              <input type="password" 
              className="form-control"
              onChange={e => setCurrent(e.target.value)}
              value={current}
              />
              {error.current_password && (<span className='text-danger'>*{error.current_password}</span>)}
            </div>
        </div>
         <div className="row mb-2">
            <div className="profileTitle col-5 mt-2">{content?.profile?.new_password}  : </div>
            <div className="col-7">
            <input type="password" 
            className="form-control"
            onChange={e => setPassword(e.target.value)}
            value={password}
            />
            {error.password && (<span className='text-danger'>*{error.password}</span>)}
            </div>
        </div>
        <div className="row mb-2">
            <div className="profileTitle col-5 mt-2">{content?.profile?.confirm_password}  : </div>
            <div className="col-7">
            <input type="password" 
            className="form-control"
            onChange={e => setConfirm(e.target.value)}
            value={confirm}
            />
            {error.password_confirmation && (<span className='text-danger'>*{error.password_confirmation}</span>)}
            </div>
        </div>
        <div className="text-end mt-3">
        <button className="btn text-black navLoginBtn">
          {loading && <SmallSpinner />}
          {content?.profile?.change_password}
        </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
