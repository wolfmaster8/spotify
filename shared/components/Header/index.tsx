import React, {useContext} from 'react';
import {ProfileContext} from "../../../application/contexts/ProfileContext";

function Header() {

    const {profile} = useContext(ProfileContext)
    return (
        <div>{profile.display_name}</div>
    );
}

export default Header;