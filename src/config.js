export const API_URL = "https://www.serapeum.io/api/profile_backend/api.php";
export const UPLOAD_URL =
  "https://www.serapeum.io/api/profile_backend/upload.php";

export const UPLOAD_Folder_URL =
  "https://www.serapeum.io/api/profile_backend/uploads/";

class Config {
  static get API_URL() {
    return API_URL;
  }
  static get UPLOAD_URL() {
    return UPLOAD_URL;
  }
  static get UPLOAD_Folder_URL() {
    return UPLOAD_Folder_URL;
  }
}

export default Config;
