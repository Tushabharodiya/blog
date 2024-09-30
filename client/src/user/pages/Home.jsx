import React, { useEffect, useState } from 'react'
import { getData } from '../../api/Api'
import { GET_BLOG } from '../../constnt'
import axios from 'axios'

const Home = () => {
    const [blog, setblog] = useState([])
    let auth = localStorage.getItem("auth")
    let getblog = async () => {
        if (auth) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${auth}`;
            try {
                let res = await getData(GET_BLOG);
                console.log(res);
                setblog(res.data.blog)

            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        } else {
            console.log("No auth token found");
        }
    };

    useEffect(() => {
        getblog();
    }, []);


    return (
        <>
            <div className="banner mt-5">
                <div className="container">
                    <div className="row">
                        {
                            blog.map((val, ind) => (
                                <React.Fragment key={ind}>
                                    <div className="col-lg-3">
                                        <div class="card">
                                            <img src={val.media} alt="blog image" />
                                            <div class="card-body">
                                                <h5 class="card-title">{val.title}</h5>
                                                <p class="card-text">{val.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
