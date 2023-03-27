import "./register.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React, { useState } from "react";
import { useNavigate } from "react-router";
const Register = () => {
  const listusers = JSON.parse(localStorage.getItem("users"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [users, setUsers] = useState(listusers);
  const navigation = useNavigate();

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      email: email,
      name: username,
      gender: "male",
      pass: password,
    };

    const userExists = users.find((user) => user.email === newUser.email);
    if (userExists) {
      const messCheck = document.getElementById('messCheck')
      messCheck.innerText = 'Email đã tồn tại. Vui lòng lựa chọn email khác';
      messCheck.style.color = 'red';
      console.log(userExists);
      return navigation("/register");
    }
    else if (newUser.email === '' || newUser.password === '') {
      const messEmail = document.getElementById('messEmail')
      messEmail.innerText = email === '' ? 'Email không được để trống' : '';
      messEmail.style.color = 'red';

      const messPassword = document.getElementById('messPassword')
      messPassword.innerText = password === '' ? 'Mật khẩu không được để trống' : '';
      messPassword.style.color = 'red';
      return navigation("/register");
    }
    else {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Đăng ký thành công")
      return navigation("/");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="register">
        <form className="login-form" onSubmit={handleSubmitRegister}>
          <div className="register_form">
            <div className="register_title">Đăng kí</div>
            <div className="register_input">
              <input
                type="email"
                placeholder="Email address *"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p id="messEmail"></p>
            <div className="register_input">
              <input
                type="password"
                placeholder="Password *"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p id="messPassword"></p>
            <div className="register_input">
              <input
                type="text"
                placeholder="Fullname"
                name="fullName"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="register_checkbox">
              Giới tính:
              <label>
                <input type="radio" name="gender" value="male" checked />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" />
                Female
              </label>
            </div>
            <p id="messCheck"></p>
            <div>
              <p>
                Nếu tài khoản đã tồn tại <a href="./">Đăng nhập</a>
              </p>
            </div>
            <div className="Register_button">
              <button type="submit">Register</button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;