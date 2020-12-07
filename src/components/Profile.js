import React, { useState, useContext } from 'react';
import { ChirpContext } from "../contexts/ChirpContext";
import './Profile.css';
import { AuthContext } from '../contexts/AuthContext';
import { storage } from '../firebase/firebase';
import Avatar from '../pics/profile.png';
import 'firebase/storage';


const Profile = () => {
    const { addUserName } = useContext(ChirpContext);
    const [profile, setProfile] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [userName, setUserName] = useState(currentUser.email);
    const [profilePic, setProfilePic] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

    const handleChangeUser = event => {
        setUserName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userName.trim() === '') {
            alert('Cannot Add a Blank User Name');
        } else {
            addUserName(userName);
            await storage.ref(`/images/${profilePic.name}`).put(profilePic);
            setImageUrl(await storage.ref('images').child(profilePic.name).getDownloadURL());
        }
    setProfile(true);
    };



const handleChangePic = (e) => {
    const image = e.target.files[0]
    setProfilePic(image)
}

return (
    <div className='profile-main container-lg'>
        <div className='row profile-row'>
            <div className='col-lg profile-col'>
                <h2 className='profile-head'>_Profile</h2>
                <p className='input-title'>User_Name</p>
                <form className="form-group" onSubmit={handleSubmit} action=''>
                    <input
                        className="input-text form-control"
                        type="text"
                        placeholder="Enter User Name"
                        onChange={handleChangeUser}
                        value={userName}
                    />
                    <p className='input-title'>Profile_Image</p>
                    <input type="file" accept='image/*' className="file-input form-control" onChange={handleChangePic} />
                    <button className="btn profile-btn" id="btn" type="submit">
                        <span className="btn__content">Save_</span>
                    </button>
                </form>
                <div>
                    {profile ? (
                        <div className="profile-foot">
                            <div className="text-foot">
                                <span className="text-foot">
                                    Your User Name _{userName}
                                </span>
                            </div>
                            <div>
                                <span className="pic-foot">
                                    Your Profile Picture_ <img className='profile-pic' alt={Avatar} src={imageUrl}  />

                                </span>
                            </div>
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