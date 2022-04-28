import useTitle from "./useTitle";
import Clock from "./Clock";
import Weather from "./Weather";
import FullScreen from "./Fullscreen";
import Logout from "./Logout";
import { useAuth } from "@/auth/auth-context";
import styled from "@emotion/styled";
import { Card } from "antd";

export default function PageHeader() {
  const title = useTitle();
  const { user } = useAuth();

  const MyHeader = styled(Card)`
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 5px;
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
  const Title = styled.div`
    font-size: 2rem;

    &::after {
      content: "";
      position: absolute;
      border: 20px solid transparent;
      border-top: 20px solid var(--tsc);
      animation: 1s linear bounce infinite;
      z-index: 6;
    }

    @keyframes bounce {
      0% {
        transform: 0;
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: 0;
      }
    }
  `;
  const WeatherCity = styled.div`
    font-size: 20px;
    display: flex;
    align-item: center;
    justify-content: end;
  `;
  return (
    <MyHeader>
      <HeaderTop>
        <div style={{ fontSize: "2rem" }}>欢迎，{user?.username}</div>
        <Logout />
        <FullScreen />
      </HeaderTop>
      <HeaderBottom>
        <Title>{title}</Title>
        <WeatherCity>
          <Clock />
          <Weather />
        </WeatherCity>
      </HeaderBottom>
    </MyHeader>
  );
}
