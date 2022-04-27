import { useState, useEffect } from "react";
import { reqWeather } from "@/api/index";
import reqLocation from "@/api/reqLocation";

/** 获取天气hooks */
export default function Weather() {
  const [weather, setWeather] = useState<any>({});
  const [city, setCity] = useState("loading...");

  useEffect(() => {
    const getWeather = async () => {
      let locationRes: any = null;
      try {
        locationRes = await reqLocation();
        const { city, adcode } = locationRes.result.addressComponent;
        setCity(() => city);
        const res: any = await reqWeather(adcode);
        if (res.status === "1") {
          setWeather(() => res.lives[0]);
        }
      } catch (e: any) {
        // 用户浏览器没开启定位权限
        if (e.code === 1 || e.message === '"User denied Geolocation"') {
          setWeather({});
        }
      }
    };
    getWeather();
  }, []);

  return (
    <>
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgBAMAAAB54XoeAAAAHlBMVEXi7/rj7/pMaXHf6vPj7/rh7vjh7ffi7vjh7ffh7feN85fmAAAACnRSTlP79gCh2R9ttUaO7kcV+QAAA2hJREFUaN7t2r1P20AUAPBn1VLWPCUt7UiFgYzUSkRGK6kyYxU6J6VqVzcdyhgLIjGGKoQ/lwEuvu9PD1V19wf89N59vjsbPrbcIIIRjGAEIxjBCEYwgv84mF1elu2B2fpvnuf5411L4Don7bFsAczu86aN63DwW56bRCvwajfF/vTm533OtlHpBV79xpfWTWeceO4DXiNpANBfsuLCGcw2e68LAJAuDUkbwKxiPUHcOoJz5EFI2ZEuncDbxkMg7YARH1zAAYoBAsCE6UUHkOpAKkCARDfQOvCLPEBIDjRzUQOeFgoQEnqkx9bgCuUZ8+OysAQzZYBciENLkO5BHoSecpzVYKUDmYEurUB6DvJdCJDQc7G2AldaEDqqxaIEC2W6Qs5DG/BYy7Hrb2QDXhg8eiqObcDK4DG7WGkGM5MHsHQCB0aP7sTaDB7KJ4ti4izM4NwYIN2JFmBhDBDQGlzvpoU5QHpUtjrwqlIuN/VyfiqV4A80LRHpWTVSgFSdYAoQ4A29hT3JwQ06gB3m8PsuA281W6oJJCUEDX5FlwC5moQcp6A4Nt3B1wUI0sLIJmOugCD7LIhbqi2IHPiy6YB0hG0yFiJ8OVtAHqANCEtZxQ3SHrQDk5kkZwKeomsXAgDMxBIeZIWHNcjWnvmQAis/MBGqWZBmbA1ys7vcg0e+IFsq1ntwg+6DLCkVFwTM0BtkNp1PBBwEgHSIQwJeBIB0L54TcB4CJhKwCgGp2T16BYUxcQM7AngcBiYCeCKAXb+cCXgYCPZ4cBUIpvwozwNB5MENho3K/jAgK6UKBSfcWi5CwR6320jArtfUrtsGyY6NGJhzyp0pbYH7U0+SslvOyJ3LRWiICVc5VO2ATW1zhqE5N/cfxVp2PaiaKlux2ziGmHAV7CEGhpg2t2bFju0YYto8ZYD0nHcNsc/dUzIMFDvNFVdxLjuKPf6uN8cwccLfRo8wTPzDX8CP1aDVnUq80RfoTyb4QQRXGNLeiuBJEPggglkR4PVlT1UhOb+Tvc4NAsBf0ue+M/+M5a/E/sPyWfHs7B1irQB9e/G98lvA3K8HayV42kIPah6CLNuB9iPXrXvCC/1Xs40ruDV8KMwcxaHxU2Z2HRaf9snU1Ca235fXOwttdnMX/3OIYAQjGMEIRjCC/z/4DPQLL9/gazh/AAAAAElFTkSuQmCC"
        alt="天气图标"
      />
      {weather ? (
        <>
          <span>{weather.temperature}摄氏度</span>
          <span>「{weather.weather}」</span>
          <span>当前:{city}</span>
        </>
      ) : (
        <span>无法获取当前位置</span>
      )}
    </>
  );
}
