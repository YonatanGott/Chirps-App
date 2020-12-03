import React, { useState, useContext } from 'react';
import { ChirpContext } from "../contexts/ChirpContext";
import './Profile.css';

const Profile = () => {
    const [userName, setUserName] = useState("");
    const { addUserName } = useContext(ChirpContext);
    const [profile, setProfile] = useState(false);

    const handleChangeUser = event => {
        setUserName(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (userName.trim() === '') {
            alert('Cannot Add a Blank User Name');
        } else {
            addUserName(userName);
        }
        setProfile(true);
    };

    return (
        <div className='profile-main container-lg'>
            <div className='row profile-row'>
                <div className='col-lg profile-col'>
                    <h2 className='profile-head'>Profile</h2>
                    <p className='input-title'>User Name</p>
                    <form className="form-group" onSubmit={handleSubmit} action=''>
                        <input
                            className="input-text form-control"
                            type="text"
                            placeholder="Enter User Name"
                            onChange={handleChangeUser}
                            value={userName}
                        />
                        <button className="btn" id="btn" type="submit">
                            <span className="btn__content">Save_</span>
                        </button>
                    </form>
                    <div>
                        {profile ? (
                            <div className="profile-foot">
                                <span className="text-foot">
                                    Current User Name _{userName}
                                </span>
                            </div>
                        ) : (
                                ""
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;