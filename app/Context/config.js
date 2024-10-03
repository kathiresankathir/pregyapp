import { Platform } from "react-native";
const ip = 'http://172.25.48.52';
export const API_SERVER_URL = `${ip}:3000`;
export const API_SERVER_SOCKET = `${ip}:8080`;
export const isWeb = Platform.OS === "web"; 
