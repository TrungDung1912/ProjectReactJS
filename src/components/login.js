import React, { useState, useEffect } from 'react';
import './login.css';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import userData from '../User.json';
import { useNavigate } from 'react-router';

function Login() {
  const listusers = JSON.parse(localStorage.getItem("users"));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let check2 = false;
  const navigation = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
   if(email ==='' || password === ''){
      check2 = true;
      const messusername = document.getElementById('mess-username')
      messusername.innerText =  email === '' ? 'Email không được để trống':'';
      messusername.style.color = 'red';

      const messpassword = document.getElementById('mess-password')
      messpassword.innerText =  password === ''? 'Mật khẩu không được để trống':'';
      messpassword.style.color = 'red';
    }
    else{      
      const user = listusers.find(u => u.email === email && u.pass === password);
      if (user) {
        alert('Login successful');
        localStorage.setItem("UserID", JSON.stringify(user));
        navigation('/home');
      }     
      else {
        const a = !user && !check2;
        const mess = document.getElementById('mess');
        mess.innerText = a ? 'Email hoặc mật khẩu không đúng':'';
        mess.style.color = 'red';
      }
  }
}

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder='Email address*' id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <p id="mess-username"></p>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Password*' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div> 
          <p id="mess-password"></p>
          <p id='mess'></p>
          <div>
            <button type="submit" className="login-button" >Đăng nhập</button>
            <button type="submit" className="login-button" >Quên mật khẩu</button>
          </div>
          <p id="mess-password"></p>
          <hr></hr>
          <div>
            Bạn chưa có tài khoản?
            <a href="./register">Đăng ký</a>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;