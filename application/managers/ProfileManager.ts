import ProfileService from "../services/ProfileService";
import {Profile} from "../models/user/Profile";

export default class ProfileManager{
    public static async getProfile(): Promise<Profile>{
        try {
            const profile = await ProfileService.getProfile()
            return Promise.resolve(profile)
        }catch (e) {
            return Promise.reject()
        }
    }
}