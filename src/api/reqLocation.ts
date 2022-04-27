/** h5定位 */
import { myAK } from "@/config";
import http from "./http";

/** 逆解析坐标 */
const reqParseLocation = (ak: string, coordString: string) => {
  return http({
    url: "/location",
    method: "get",
    params: {
      ak: ak,
      output: "json",
      coordtype: "wgs84ll",
      location: coordString,
    },
  });
};

// const temp = {
// 	status: 0,
// 	result: {
// 		location: { lng: 113.8139796535572, lat: 22.682169608843198 },
// 		business: "福永",
// 		addressComponent: {
// 			province: "广东省",
// 			city: "深圳市",
// 			city_level: 2,
// 			district: "宝安区",
// 		},
// 		cityCode: 340,
// 	},
// };
// 从navigator拿到坐标
export default function getLocation(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (s: GeolocationPosition) => {
        const { latitude, longitude } = await s.coords;
        const coordString = `${latitude},${longitude}`;
        const res = await reqParseLocation(myAK, coordString);
        if (res.status !== 0) {
          resolve([res]);
        } else {
          resolve([null, res]);
        }
      },
      (r: GeolocationPositionError) => {
        resolve([r]);
      }
    );
  });
}
