import React, { useEffect, useState } from 'react'
import "./Page.css"
import axios from 'axios'
import config from '../config'
const Page = ({ model }) => {
    const [page, setPage] = useState(1)
    const [showCategory, setShowCategory] = useState([])
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([])
    const [search, setSearch] = useState('');
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    let counter = 0
    useEffect(() => {
        const viewer = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("token"))
                let url = `${config.backendUrl}/viewcategory?page=${page}&token=${token}`;
                if (search) {
                    url += `&search=${encodeURIComponent(search)}`;
                }
                const response = await axios.post(url);
                // console.log(response, "response")
                if (response.data.success) {
                    setShowCategory(response.data.view)
                } else {
                    alert('internal error')
                }

            } catch (error) {
                console.log(error.message)

            }
        }
        viewer()
    }, [page, search, model]);

    const handleCheckboxChange = (event, categoryId) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedCheckboxes(prevState => [...prevState, categoryId]);
            selectAndDelete();
        } else {
            setSelectedCheckboxes(prevState => prevState.filter(id => id !== categoryId));
        }
    };

    const handlePrevClick = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0)); // Ensure page doesn't go below 0
    };

    const handleNextClick = () => {
        setPage((prevPage) => prevPage + 1);
    };


    const handleSelectAllChange = (event) => {
        const isChecked = event.target.checked;
        setSelectAllChecked(isChecked);
        if (isChecked) {
            const allIds = showCategory.map(cat => cat._id);
            setSelectedCheckboxes(allIds);
        } else {
            setSelectedCheckboxes([]);
        }
    };


    const selectAndDelete = async () => {
        try {
            // Send selected checkbox values to the backend
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.post(`${config.backendUrl}/deleteSelected`, { selectedCheckboxes, token });
            if (response.data.success) {
                alert(response.data.message)
                setShowCategory(prevState => prevState.filter(cat => !selectedCheckboxes.includes(cat._id)));
                setSelectAllChecked(false)
            } else {
                alert('something went wrong try again ');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <div className='page-head-body'>
                <input className="page-checkbox" type='checkbox' checked={selectAllChecked}
                    onChange={handleSelectAllChange} />
                <div className='page-head-title'><p>Service Category</p></div>
                <div className='page-search-div'><input className='page-search-div-input' type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." ></input></div>
                <button className='page-head-button' onClick={selectAndDelete}>Delete</button>
            </div>
            <div className='multiple-service-body'>
                {showCategory.length === 0 ? (
                    <p>No categories found.</p>
                ) : (
                    showCategory.map((cat) => {
                        counter++;
                        console.log(cat, "cat")
                        return (
                            <div className='multiple-service-children' key={cat._id} style={{ backgroundColor: `${cat.color}` }}>
                                <input className='page-checkbox-children' type='checkbox' checked={selectedCheckboxes.includes(cat._id)} onChange={(event) => handleCheckboxChange(event, cat._id)} />
                                <div className='image-circle-frame'>
                                    <img className="image-circle" src={cat.image} alt='upload' />
                                </div>
                                <div className='short-detail-body'>
                                    <p className='short-detail-body-title'>{cat.name}</p>
                                    <p className='short-detail-body-description'>{cat.description}</p>
                                </div>
                            </div>
                        );
                    })
                )}

            </div>
            {counter >= 5 && <div className='page-counter'>
                <button onClick={handlePrevClick} disabled={page === 1}>Prev</button>
                <div>{page}</div>
                <button onClick={handleNextClick} disabled={page >= 2}>Next</button>
            </div>}

        </div >
    )
}

export default Page
