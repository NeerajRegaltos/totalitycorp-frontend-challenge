import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: {
            name: "",
            img: "",
            email: "",
            password: ""
        },
        isLogin: false,
        allUsers: []
    },
    reducers: {
        setUserData: (state: any, action: any) => {
            state.userData = action.payload;
            if (action.payload.name !== "") {
                state.allUsers.push(action.payload);
            }

        },
        setIsLogin: (state: any, action: any) => {
            state.isLogin = action.payload;
        }
    }
})

export default userSlice.reducer;

export const { setUserData, setIsLogin } = userSlice.actions;