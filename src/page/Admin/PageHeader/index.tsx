import Clock from "@/components/Clock";
import Weather from "@/components/Weather";
import FullScreen from "@/components/Fullscreen";
import Logout from "./Logout";
import { useAuth } from "@/auth/auth-context";
import styled from "@emotion/styled";
import PageTitle from "./PageTitle";

export default function PageHeader() {
  const { user } = useAuth();

  const MyHeader = styled.div`
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 5px;
    padding: 0 24px;
    background: #fff;
  `;
  const HeaderTop = styled.div`
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: end;
    gap: 1em;
    align-items: center;
  `;
  const HeaderBottom = styled.div`
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
  `;

  const WeatherCity = styled.div`
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: end;
    background: var(--tsc);
    color: azure;
    border-radius: 1rem;
    padding: 0 3rem;
  `;

  const UserControl = styled.div`
    display: flex;
    gap: 2rem;
  `;
  return (
    <MyHeader>
      <HeaderTop>
        <WeatherCity>
          <Clock />
          <Weather />
        </WeatherCity>
      </HeaderTop>
      <HeaderBottom>
        <PageTitle />
        <UserControl>
          <div>欢迎，{user?.username}</div>
          <Logout />
          <FullScreen />
        </UserControl>
      </HeaderBottom>
    </MyHeader>
  );
}
