import React, { useRef } from 'react'
import { addData } from '../../api/Api';
import { USER_REGISTER } from '../../constnt';
import Swal from 'sweetalert2';

const Register = () => {

    let name = useRef();
    let email = useRef();
    let password = useRef();
    let confirmpassword = useRef();

    let handlesubmit = async (e) => {
        e.preventDefault();

        let data = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
            confirmpassword: confirmpassword.current.value,
        }
        console.log(data);

        // let res = await addData(USER_REGISTER, data)
        // console.log(res);
        try {
            let res = await addData(USER_REGISTER, data);

            if (res.status === 201) {
                Swal.fire({
                    text: "Registration successful! Please log in.",
                    icon: "success"
                });
            }

            if (res.status === 401) {
                Swal.fire({
                    icon: "error",
                    text: res.data.message,
                });
            }
            name.current.value = '';
            email.current.value = '';
            password.current.value = '';
            confirmpassword.current.value = '';

        } catch (error) {
            name.current.value = '';
            email.current.value = '';
            password.current.value = '';
            confirmpassword.current.value = '';
            Swal.fire({
                icon: "error",
                text: "Registration failed. Please try again!",
            });
        }

    }


    return (
        <>
            <div className="registerPage loginPage">
                <div className="loginForm">
                    <h2 className='my-0 mb-3'>Register form</h2>
                    <form onSubmit={handlesubmit}>
                        <label>name<input type="text" name='name' ref={name} className='form-control' required /></label>
                        <label>email<input type="email" name='email' ref={email} className='form-control' required /></label>
                        <label>password<input type="password" name='password' ref={password} className='form-control' required /></label>
                        <label>confimpassword<input type="password" name='confirmpassword' ref={confirmpassword} className='form-control' required /></label>
                        <div className="auth-btn text-center">
                            <button type='submit'>register</button>
                        </div>
                        <div className="auth-link  text-center">
                            <a href="/login">you have alreay account</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
