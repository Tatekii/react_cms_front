import { useRef, useState } from "react";
import { Button, Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { Option } = Select;

export default function Search(setSearchProps) {
	const fn = setSearchProps;
	// 接受修改请求参数的setFn
	const inputRef = useRef(null);


	// useSearch会保留请求类型
	// searchType: "noSearch"为不搜索
	const [searchType, setSearchType] = useState("productName");

	const handleSelect = (v) => {
		setSearchType(() => v);
	};
	const handleSearch = () => {
		const keyword = inputRef.current.state.value?.trim();

		if (!keyword || keyword === "") {
			// 搜索空
			console.log('搜索空');
			inputRef.current.state.value = "";
			// setSearchType(()=>"noSearch")
		}
		// 去修改请求的参数
		console.log(`搜索${searchType}---${inputRef.current.state.value}`);
		fn(() => {
			return { searchType: searchType, searchKeyword: inputRef.current.state.value };
		});
	};

	return (
		<div>
			<Select defaultValue="productName" onSelect={handleSelect}>
				<Option value="productName">商品名称</Option>
				<Option value="productDesc">商品描述</Option>
			</Select>
			<Input ref={inputRef} placeholder="请输入" style={{ margin: "0 10px", width: "40%" }} allowClear />
			<Button onClick={handleSearch} type="primary" shape="circle" icon={<SearchOutlined />} />
		</div>
	);
}
