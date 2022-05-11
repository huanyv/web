
import { ElMessage } from "element-plus";


export const message = {
    error: msg => {
        ElMessage({
            showClose: true,
            message: msg,
            type: "error",
        });
    },
    success: msg => {
        ElMessage({
            showClose: true,
            message: msg,
            type: "success",
        });
    },
    warning: msg => {
        ElMessage({
            showClose: true,
            message: msg,
            type: "warning",
        });
    }
}


export const getToken = () => {
    return window.localStorage.getItem("token")
}