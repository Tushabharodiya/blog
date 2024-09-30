import React, { useRef } from 'react'
import { addData } from '../../api/Api';
import { USER_LOGIN } from '../../constnt';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let email = useRef();
    let password = useRef();
    let confirmpassword = useRef();
    let navigate = useNavigate()

    let handlesubmit = async (e) => {
        e.preventDefault();

        let data = {
            email: email.current.value,
            password: password.current.value,
            confirmpassword: confirmpassword.current.value,
        }
        console.log(data);

        // let res = await addData(USER_LOGIN, data)
        // console.log(res);
        try {
            let res = await addData(USER_LOGIN, data);
            console.log(res);
            localStorage.setItem("auth", res.data.token)


            if (res.status === 201) {
                Swal.fire({
                    text: "login successful",
                    icon: "success"
                });
                console.log(res.data.user.role);

                if (res.data.user.role == "admin") {
                    navigate("/admin")
                } else {
                    navigate("/home")
                }
            }

            if (res.status === 401) {
                Swal.fire({
                    icon: "error",
                    text: res.data.message,
                });
            }
            email.current.value = '';
            password.current.value = '';
            confirmpassword.current.value = '';

        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "login failed. Please try again!",
            });
            email.current.value = '';
            password.current.value = '';
            confirmpassword.current.value = '';
        }

    }


    return (
        <>
            <div className="registerPage loginPage">
                <div className="loginForm">
                    <h2 className='my-0 mb-3'>login form</h2>
                    <form onSubmit={handlesubmit}>
                        <label>email<input type="email" name='email' ref={email} className='form-control' required /></label>
                        <label>password<input type="password" name='password' ref={password} className='form-control' required /></label>
                        <label>confimpassword<input type="password" name='confirmpassword' ref={confirmpassword} className='form-control' required /></label>
                        <div className="auth-btn text-center">
                            <button type='submit'>login</button>
                        </div>
                        <div className="auth-link  text-center">
                            <a href="/register">you have not account ?</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
