import { Bounce, toast } from "react-toastify";

const toastConfig: any = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Bounce,
};

export const toastSuccess = (text: string) => {
  toast.success(text, toastConfig);
};

export const toastError = (text: any) => {
  toast.error(text, toastConfig);
};

export const toastWarning = (text: any) => {
  toast.warn(text, toastConfig);
};

export const toastInfo = (text: any) => {
  toast.info(text, toastConfig);
};
