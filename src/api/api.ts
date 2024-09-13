/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

// tao instance axios cho get coin
const coinAxios: AxiosInstance = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// tao instance axios cho set rate
const rateAxios: AxiosInstance = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// ham throw error/xu ly loi chung
const handleError = (error: AxiosError) => {
  console.log(error.response?.data || error?.message);
};

// ham call api top20-price, thuc hien sau khi set rate usdt_vnd va krw_vnd
export const getAllCoin = async () => {
  try {
    const res: AxiosResponse = await coinAxios.get("top20-prices");
    return res?.data;
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

export const getRate = async () => {
  try {
    const res: AxiosResponse = await rateAxios.get("rates");
    return res?.data;
  } catch (error) {
    return handleError(error as AxiosError);
  }
};


export const setRate = async (data: any) => {
  try {
    const res: AxiosResponse = await rateAxios.post("rates", data);
    return res?.data;
  } catch (error) {
    return handleError(error as AxiosError);
  }
};
