
export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
    Register : "/registration",
    Login :  "/login",
    GetProfile : "/profile",
    PutProfile : "/profile/update",
    PutProfileImage : "/profile/image",
    GetBanner : "/banner",
    GetService : "/services",
    GetBalance : "/balance",
    PostTopUp : "/topup",
    PostTransaction : "/transaction",
    GetTransaction : "/transaction/history"
}