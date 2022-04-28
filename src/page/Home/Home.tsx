import { useState } from "react";
import { Card, Statistic, DatePicker, Timeline } from "antd";
import {
  QuestionOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Line from "./Line";
import Bar from "./Bar";
import styled from "@emotion/styled";
import { Row, Button } from "antd";

const dateFormat = "YYYY/MM/DD";
const { RangePicker } = DatePicker;

export default function Home() {
  const [isVisited, setVisited] = useState(true);

  const handleChange = (f: boolean) => {
    return () => setVisited(f);
  };

  const LineContainer = styled.div`
    flex: 1;
    overflow: hidden;
  `;

  const MyRow = styled(Row)`
    display: flex;
    justify-content: space-between;
  `;

  return (
    <Card>
      <MyRow>
        {/* 总量 */}
        <Card
          title="商品总量"
          extra={<QuestionOutlined />}
          style={{ flexBasis: 250, flexShrink: 0 }}
          headStyle={{ color: "rgba(0,0,0,.45)" }}
        >
          <Statistic
            value={1128163}
            suffix="个"
            style={{ fontWeight: "bolder" }}
          />
          <Statistic
            value={15}
            valueStyle={{ fontSize: 15 }}
            prefix={"周同比"}
            suffix={<ArrowUpOutlined style={{ color: "red" }} />}
          />
          <Statistic
            value={10}
            valueStyle={{ fontSize: 15 }}
            prefix={"日同比"}
            suffix={<ArrowDownOutlined style={{ color: "green" }} />}
          />
        </Card>
        {/* 折线图 */}
        <LineContainer>
          <Line />
        </LineContainer>
      </MyRow>

      <Card
        style={{ width: "100%" }}
        title={
          <>
            <Button
              className={
                isVisited
                  ? "home-menu-active home-menu-visited"
                  : "home-menu-visited"
              }
              onClick={handleChange(true)}
            >
              访问量
            </Button>
            <Button
              className={isVisited ? "" : "home-menu-active"}
              onClick={handleChange(false)}
            >
              销售量
            </Button>
          </>
        }
        extra={
          <RangePicker
            defaultValue={[
              moment("2020/01/01", dateFormat),
              moment("2021/01/01", dateFormat),
            ]}
            format={dateFormat}
          />
        }
      >
        <MyRow>
          <Card
            style={{ width: "60%" }}
            title={isVisited ? "访问趋势" : "销售趋势"}
            bodyStyle={{ padding: 0, height: 275 }}
            extra={<ReloadOutlined style={{ color: "red" }} />}
          >
            <Bar />
          </Card>

          <Card
            title="任务"
            extra={<ReloadOutlined />}
            className="home-table-right"
          >
            <Timeline>
              <Timeline.Item color="green">新版本迭代会</Timeline.Item>
              <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
              <Timeline.Item color="red">
                <p>联调接口</p>
                <p>功能验收</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>登录功能设计</p>
                <p>权限验证</p>
                <p>页面排版</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </MyRow>
      </Card>
    </Card>
  );
}
