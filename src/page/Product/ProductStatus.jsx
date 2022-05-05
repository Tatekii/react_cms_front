import { useState } from "react";
import { Button, message } from "antd";
import { reqUpdateProductStatus } from "@/api/product";



/**
 * @export 上架下架按钮
 * @param {*} item 传入的行数据
 * @return {*} 
 */
export default function ProductStatus({item}) {
	const { _id } = item;
	const [status, setStatus] = useState(item.status);

	const handleChangeStatus = async () => {
		//
		const res = await reqUpdateProductStatus(_id, status === 1 ? 2 : 1);
		if (res.status === 0) {
			// success
			setStatus(() => (status === 1 ? 2 : 1));
		} else if (status === 1) {
			message.warn(res.msg, 1);
		}
	};

	return (
		<div>
			<span>{status === 1 ? "在售" : "已停售"}</span>
			<Button type={status === 1 ? "danger" : "primary"} onClick={handleChangeStatus}>
				{status === 1 ? "下架" : "上架"}
			</Button>
		</div>
	);
}
