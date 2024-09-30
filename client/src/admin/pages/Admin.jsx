import React, { useEffect, useState } from 'react';
import { ADD_BLOG, BASE_URL, DELETE_BLOG, GET_BLOG, UPDATE_BLOG } from '../../constnt';
import { addData, deleteData, getData } from '../../api/Api';
import axios from 'axios';
import Swal from 'sweetalert2';

const Admin = () => {
    const [blog, setblog] = useState([]);
    const [view, setview] = useState({
        _id: '',
        title: '',
        description: '',
        media: null 
    });

    let auth = localStorage.getItem("auth");
    let getblog = async () => {
        if (auth) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${auth}`;
            try {
                let res = await getData(GET_BLOG);
                setblog(res.data.blog);
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

    let addblog = async () => {
        try {
            let formdata = new FormData();
            formdata.append("title", view.title);
            formdata.append("media", view.media);
            formdata.append("description", view.description);

            let res = await addData(ADD_BLOG, formdata);
            if (res.status == 201) {
                Swal.fire({
                    icon: "success",
                    text: res.data.message
                });
                setblog([...blog, res.data.blog]);
                setview({ title: '', description: '', media: null });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Something went wrong, please try again"
            });
        }
    };

    // Delete Blog
    let deleteBlog = async (id) => {
        try {
            let res = await deleteData(DELETE_BLOG, id);
            if (res.status == 200) {
                Swal.fire({
                    icon: "success",
                    text: res.data.message
                });
                setblog(blog.filter((val) => val._id !== id));
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Something went wrong, please try again"
            });
        }
    };

    // Prepare blog data for update
    let updateBlog = (blogdata) => {
        setview({
            _id: blogdata._id,
            title: blogdata.title,
            description: blogdata.description,
            media: null 
        });
    };

    let handleMediaChange = (e) => {
        setview({
            ...view,
            media: e.target.files[0] 
        });
    };

    let saveblog = async () => {
        try {
            let formdata = new FormData();
            formdata.append("title", view.title);
            formdata.append("description", view.description);
            if (view.media) {
                formdata.append("media", view.media); 
            }

            let res = await axios.put(`${BASE_URL}${UPDATE_BLOG}/${view._id}`, formdata);
            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    text: "Blog updated successfully"
                });
                setblog(blog.map((val) => (val._id === view._id ? res.data.blog : val))); 
                setview({ title: '', description: '', media: null });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Something went wrong. Please try again."
            });
            console.error("Error updating blog:", error);
        }
    };

    return (
        <>
            <div className="adminpage mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="add-btn d-flex justify-content-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <button>add Blog</button>
                            </div>

                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="mb-3">
                                                    <label className='w-100'>Title
                                                        <input
                                                            type="text"
                                                            value={view.title}
                                                            onChange={(e) => setview({ ...view, title: e.target.value })}
                                                            className="form-control"
                                                        />
                                                    </label>
                                                </div>
                                                <div className="mb-3">
                                                    <label className='w-100'>Media
                                                        <input
                                                            type="file"
                                                            onChange={handleMediaChange}
                                                            className="form-control"
                                                        />
                                                    </label>
                                                </div>
                                                <div className="mb-3">
                                                    <label className='w-100'>Description
                                                        <input
                                                            type="text"
                                                            value={view.description}
                                                            onChange={(e) => setview({ ...view, description: e.target.value })}
                                                            className="form-control"
                                                        />
                                                    </label>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer justify-content-center">
                                            {!view._id ? (
                                                <button type="button" data-bs-dismiss="modal" onClick={addblog}>Add Blog</button>
                                            ) : (
                                                <button type="button" data-bs-dismiss="modal" onClick={saveblog}>Save Blog</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Media</th>
                                        <th>Description</th>
                                        <th>Delete</th>
                                        <th>Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blog.map((val, ind) => (
                                        <tr key={ind}>
                                            <td><img src={val.media} alt="blog" width="100" /></td>
                                            <td>{val.title}</td>
                                            <td>{val.description}</td>
                                            <td><button onClick={() => deleteBlog(val._id)}>delete</button></td>
                                            <td><button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => updateBlog(val)}>update</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
