import AxiosInstance from "./AxiosInstence";

interface Auth {
  email: string;
  password: string;
}

const Login = async (auth: Auth) => {
  try {
    const response = await AxiosInstance.post("/Auth/login", auth);
    return response.data;
  } catch (error) {
    return error;
  }
};

const Logout = async () => {
    try {
        localStorage.clear();
    }catch (error) {
        return error;
    }
}

export {
    Login,
    Logout
};
