import axios from "axios";
import { IDeposit } from "../data/types";

export async function getDataWithAxios(url: string) {
  try {
    const response = await axios.get<IDeposit[]>(url);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
