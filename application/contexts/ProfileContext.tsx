import {createContext, ReactNode, useEffect, useState} from "react";
import ProfileManager from "../managers/ProfileManager";
import {Profile} from "../models/user/Profile";

interface ProfileContextData {
    profile: Profile
}

export const ProfileContext = createContext({} as ProfileContextData)


interface ProfileProviderProps {
    children: ReactNode;
}

export function ProfileProvider({children}: ProfileProviderProps){
    const [profile, setProfile] = useState({} as Profile);

    useEffect(async () => {
        const data = await ProfileManager.getProfile();
        setProfile(data)
    }, [])
    return(
        <ProfileContext.Provider value={{profile}}>
            {children}
        </ProfileContext.Provider>
    )
}