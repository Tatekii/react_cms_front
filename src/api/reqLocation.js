/** 配合h5定位api */
import { reqLocationRequest } from "@/api";
import { myAK } from "@/config";

export default function reqLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (s) => {
        const { latitude, longitude } = await s.coords;
        const coords = `${latitude},${longitude}`;
        const res = await reqLocationRequest(myAK, coords);
        resolve(res);
      },
      (r) => {
        reject(r);
      }
    );
  });
}
