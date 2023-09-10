import { createSlice } from "@reduxjs/toolkit";

type userDataType = {
    name: string,
    img: string,
    email: string,
    password: string
}

type userType = {
    userData: userDataType,
    allUsers: {}[]
}

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
        setUserData: (state: userType, action: { payload: userDataType }) => {
            state.userData = action.payload;
            if (action.payload.name !== "") {
                state.allUsers.push(action.payload);
            }

        },
        setIsLogin: (state: { isLogin: boolean }, action: { payload: boolean }) => {
            state.isLogin = action.payload;
        }
    }
})

export default userSlice.reducer;

export const { setUserData, setIsLogin } = userSlice.actions;