import React, { useState } from 'react';

function UsersProfileCard({ imglink, Name, Phone, email, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ Name, Phone, imglink });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onUpdate({ name: formData.Name, phone: formData.Phone, profileImage: formData.imglink });
        setIsEditing(false);
    };

    return (
        <div className="container-fluid rounded shadow-sm border w-100 p-3 d-flex justify-content-between align-items-center">
            {!isEditing ? (
                <div className="d-flex gap-3">
                    <div className="profile-img">
                        <img
                            className="rounded"
                            style={{ height: 90, objectFit: 'cover' }}
                            src={imglink}
                            alt="profile"
                        />
                    </div>
                    <div className="user-info d-flex flex-column justify-content-center">
                        <p className="h4 mb-1">{Name}</p>
                        <p className="h6 mb-1 text-muted">{Phone}</p>
                        <p className="h6 mb-0 text-muted">{email}</p>
                    </div>
                </div>
            ) : (
                <div className="d-flex pe-3 justify-content-between flex-column w-100">
                    <div className='d-flex gap-3'>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Name</span>
                            <input type="text" name="Name" value={formData.Name}
                                onChange={handleInputChange} class="form-control" placeholder="Your Name" />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Phone</span>
                            <input type="text" name="Phone" value={formData.Phone}
                                onChange={handleInputChange} class="form-control" placeholder="Phone No." />
                        </div>
                    </div>

                    <div class="input-group">
                        <span class="input-group-text">Img Url</span>
                        <input type="text" name="imglink" value={formData.imglink}
                            onChange={handleInputChange} class="form-control" placeholder="Img Link" />
                    </div>
                </div>
            )}
            <div className="d-flex flex-column gap-2">
                {!isEditing ? (
                    <button className="btn btn-primary px-4" onClick={() => setIsEditing(true)}>
                        Update
                    </button>
                ) : (
                    <button className="btn btn-success px-4" onClick={handleSave}>
                        Save
                    </button>
                )}
                <button className="btn btn-danger px-4" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default UsersProfileCard;