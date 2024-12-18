// export const handleCopy=async({data,alertShow,alertText})=>{
//   try {
//     await navigator.clipboard.writeText(data)
//   } catch (error) {
//     alert('error copied')
//   } finally{
//     if(alertShow&&!alertText) alert('Copied '+data)
//     if(alertShow&&alertText) alert(alertText)
//   }

import toast from "@/store/toast";

// }
export function getTimeGap(transactionTime, expiryTime) {
  const transactionTimestamp = new Date(transactionTime).getTime();
  const expiryTimestamp = new Date(expiryTime).getTime();
  const timeGap = expiryTimestamp - transactionTimestamp;
  return timeGap / 60000;
}

export function handleChangeInput({
  value,
  key,
  validation,
  setState,
  setValidation,
}) {
  if (value) setValidation(validation.filter((val) => val !== key));
  if (!value) setValidation((prev) => [...prev, key]);
  setState((prev) => ({ ...prev, [key]: value }));
}

export const timeCountdown = (sec) => {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export const handleDownload = async (fileUrl, fileName) => {
  try {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
    alert("Download gagal. Silakan coba lagi.");
  }
};

export const handleCopy = async (text, alert) => {
  toast.getState().setShowToast(true);
  try {
    await navigator.clipboard.writeText(text);
    toast.getState().setDataToast({ type: "success", message: alert });
  } catch (error) {
    toast.getState().setDataToast("Copy failed! ", error);
  }
};
