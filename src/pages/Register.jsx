import axios from "axios";
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { BiLink, BiLock, BiPhone, BiUser } from "react-icons/bi";
import { FaIdCard } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../hooks/baseURL";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [refCode, setRefCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    const inputData = {
      name,
      phone,
      password,
      password_confirmation: confirmPassword,
      referral_code: refCode,
    };
    try {
      const res = await axios.post(BASE_URL + "/register", inputData);
      if (res.status === 200) {
        setLoading(false);
        localStorage.setItem("token", res.data.data.token);
        navigate("/");
      }
    } catch (e) {
      setLoading(false);
      setError(e.response.data.errors);
    }
  };
  return (
    <div className="authBg py-4 mb-5">
      <h3 className="fw-bold text-center">စာရင်းသွင်းရန်</h3>
      {/* <h6 className="text-warning text-center mt-4 mb-3 fw-bold"> 
      စာရင်းသွင်းပြီးလျှင်ပြောင်းလဲ၍ မရတော့သောကြောင့် သင်၏သတင်းအချက်အလက်များကို အမှန်တိုင်းဖြည့်စွက်ပေးပါ
       </h6> */}
      <form onSubmit={register} className="authForm mx-auto my-4">
        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text className="formIcon" id="basic-addon1">
              <FaIdCard size={20} />
            </InputGroup.Text>
            <Form.Control
              placeholder="အမည်ရင်း"
              aria-describedby="basic-addon1"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </InputGroup>
          {error.name && <div className="text-danger">{error.name}</div>}
        </div>
        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text className="formIcon" id="basic-addon1">
              <BiPhone size={20} />
            </InputGroup.Text>
            <Form.Control
              placeholder="ဖုန်းနံပါတ်"
              aria-describedby="basic-addon1"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </InputGroup>
          {error.phone && <div className="text-danger">{error.phone}</div>}
        </div>
        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text className="formIcon" id="basic-addon1">
              <BiLock size={20} />
            </InputGroup.Text>
            <Form.Control
              placeholder="စကားဝှက်"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </InputGroup>
          {error.password && (
            <div className="text-danger">{error.password}</div>
          )}
        </div>

        <div className="mb-3">
          <InputGroup className="mb-3">
            <InputGroup.Text className="formIcon" id="basic-addon1">
              <BiLock size={20} />
            </InputGroup.Text>
            <Form.Control
              placeholder="စကားဝှက် အတည်ပြုပါ"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </InputGroup>
          {error.password_confirmation && (
            <div className="text-danger">{error.password_confirmation}</div>
          )}
        </div>
        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text className="formIcon" id="basic-addon1">
              <BiLink size={20} />
            </InputGroup.Text>
            <Form.Control
              placeholder="ရည်ညွန်းကုဒ်"
              aria-describedby="basic-addon1"
              onChange={(e) => setRefCode(e.target.value)}
              value={refCode}
            />
          </InputGroup>
          {error.referral_code && (
            <div className="text-danger">{error.referral_code}</div>
          )}
        </div>

        <div className="authBtns">
          <button type="submit" className="registerBtn mb-3 pb-3">
            <div className="text-center pt-3 ">
              <h5 className="fw-semibold">စာရင်းသွင်းရန်</h5>
            </div>
          </button>
          <Link to={"/login"}>
            <div className="loginBtn mb-3">
              <div className="text-center pt-3">
                <h5 className="fw-semibold">လော့အင်</h5>
              </div>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
