import { loginFailure , loginStart, loginSuccess } from "./userRedux";
import axios from "axios";
import { AppDispatch } from "./store";

interface UserCredentials {
  email: string;
  password: string;
}

export const login = async (dispatch: AppDispatch, user: UserCredentials) => {
  dispatch(loginStart());
  try {
    const res = await axios.post('http://localhost:5000/api/users/login', user);
    dispatch(loginSuccess(res.data));
    alert('Login Successful');
    window.location.href = '/';
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      dispatch(loginFailure());
      alert(err.response?.data?.message || 'Login failed');
    } else {
      dispatch(loginFailure());
      alert('An unexpected error occurred');
    }
  }
};
