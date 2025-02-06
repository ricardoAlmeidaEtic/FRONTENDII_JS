type UserProfile = {
    name: string;
    email: string;
    age: number;
    message?: {
        id: number;
        content: string;
        likes: number;
    }[];
};

let userProfile: UserProfile = {
    name: 'Jack',
    email: '',
    age: 25
};

console.log("userProfile: ",userProfile)

function getUserProfile(): UserProfile {
    return userProfile;
}

function setUserProfile(profile: UserProfile): void {
    userProfile = profile;
}

function addMessage(message: { id: number; content: string; likes: number }): void {
    if (!userProfile.message) {
        userProfile.message = [];
    }
    userProfile.message.push(message);
}