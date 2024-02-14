import React, { useState } from 'react';
import axios from 'axios';
import "./Home.css";
// import { useNavigate } from 'react-router-dom';


const Home = ({ navbar: NavBar, page: Page }) => {
    const [color, setColor] = useState('');
    // const redirect = useNavigate();
    const [model, setModel] = useState(false);
    const [serviceData, setServiceData] = useState({ name: "", description: "", color: "", image: null });
    // console.log(serviceData, "here")

    const handleChange = (event) => {
        setServiceData({ ...serviceData, [event.target.name]: event.target.value });
    }

    const handleImageField = (event) => {
        setServiceData({ ...serviceData, "image": event.target.files[0] });
    }

    const colorHandleChange = (event) => {
        const selectedColor = event.target.value;
        setColor(selectedColor);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Frontend validation for description length
        if (serviceData.description.length > 200) {
            alert("Description should not exceed 200 characters");
            return;
        }

        // Frontend validation for supported file types and size
        const allowedFileTypes = ["jpg", "jpeg", "png"];
        const maxFileSizeKB = 500; // 500KB
        const file = serviceData.image;
        if (!file) {
            alert("Please select an image file");
            return;
        }
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedFileTypes.includes(fileExtension)) {
            alert("Image file type should be JPG, JPEG, or PNG");
            return;
        }
        if (file.size > maxFileSizeKB * 1024) {
            alert(`Image file size should be less than ${maxFileSizeKB}KB`);
            return;
        }
        if (serviceData.name && serviceData.description && serviceData.color && serviceData.image) {
            try {
                const formData = new FormData();
                formData.append('name', serviceData.name);
                formData.append('description', serviceData.description);
                formData.append('color', serviceData.color);
                formData.append('image', serviceData.image);

                const token = JSON.parse(localStorage.getItem("token"));
                const response = await axios.post("http://localhost:4000/addservice", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response?.data?.success) {
                    alert(response.data.message);
                    setServiceData({ name: "", description: "", color: "", image: null });
                    setModel(false);

                }
            } catch (error) {
                console.log("Error response:", error.response);
                if (error.response && error.response.data && error.response.data.error) {
                    alert(error.response.data.error); // Display backend validation error
                } else {
                    console.log(error);
                    alert("An error occurred. Please try again later."); // Generic error message
                }
            }
        } else {
            alert("all field are required");
        }
    }

    return (
        <div className='home-body'>
            <NavBar />
            <div className='body-title'>
                <div className='page-title'><h2>View service category</h2></div>
                <div className='add-div'><button className='new-category-button' onClick={() => setModel(true)}>Add new Category + </button></div>
            </div>
            <Page model={model} />
            {model ?
                <div className='model-div'>
                    <form onSubmit={handleSubmit} >
                        <h1 className='model-div-title'>Add Category</h1><span className='model-span' onClick={() => setModel(false)}>X</span>
                        <label className='model-div-label'>Name:</label><br />
                        <input type='text' name='name' className="model-div-input" onChange={handleChange} value={serviceData.name} autocomplete="off" /><br />
                        <label className='model-div-label'>Description:</label><br />
                        <input type='text' name='description' className="model-div-input" onChange={handleChange} value={serviceData.description} autocomplete="off" /><br />
                        <select className="model-div-select" onChange={(event) => { handleChange(event); colorHandleChange(event); }} name='color' style={{ backgroundColor: color }} value={color}>
                            <option>color</option>
                            <option value="#ADD8E6" style={{ backgroundColor: "#ADD8E6" }}>Light Blue</option>
                            <option value="#fffd8d" style={{ backgroundColor: "#fffd8d" }}>Yellow</option>
                            <option value="#CBC3E3" style={{ backgroundColor: "#CBC3E3" }}>Lavender</option>
                            <option value="#FFB6C1" style={{ backgroundColor: "#FFB6C1" }}>Light Pink</option>
                            <option value="#d0b783" style={{ backgroundColor: "#d0b783" }}>Tan</option>
                        </select>
                        {/* {color && <p>Selected Color: {color}</p>} */}
                        <input className='model-div-file-input' type="file" accept="image/*" name='image' onChange={handleImageField} /><br />
                        <input className="model-div-button" type='submit' value="Add Product" />
                    </form>

                </div> : null
            }
        </div >
    );
}

export default Home;
