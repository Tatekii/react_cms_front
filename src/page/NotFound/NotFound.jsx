import { Button } from "antd";
import styled from "@emotion/styled";
import img4 from '@/assets/img/404.png'
import { useNavigate } from "react-router-dom";
/*
404页面
 */
export default function NotFound() {
	const Container = styled.div`
		height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
	`;
	const Main = styled.div`
		text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 2rem;
	`;

  const navigate  = useNavigate()
	return (
		<Container>
      <img src={img4} alt="notfound"/>
			<Main>
				<h1>404</h1>
				<h2>抱歉，你访问的页面不存在</h2>
				<div>
					<Button type="primary" onClick={() => navigate("/home")}>
						回到首页
					</Button>
				</div>
			</Main>
		</Container>
	);
}
