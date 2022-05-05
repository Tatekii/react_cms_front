import { Table, Button, TableProps } from "antd";
import { PAGE_SIZE } from "@/config";
import { useAppSelector } from "@/hooks/useRedux";
import { CategoryItem } from "@/types";

interface CategoryTableProps extends TableProps<CategoryItem> {
  handleShowUpdateModal: (item: CategoryItem) => void;
}

const CategoryTable = ({
  handleShowUpdateModal,
  ...props
}: CategoryTableProps) => {
  const categoryList = useAppSelector((state) => state.category);
  return (
    <Table
      bordered={true}
      rowKey="_id"
      pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
      columns={[
        {
          title: "分类名称",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "操作",
          key: "operator",
          render: (item: CategoryItem) => (
            <Button
              type="link"
              onClick={() => {
                handleShowUpdateModal(item);
              }}
            >
              修改分类
            </Button>
          ),
          width: "25%",
          align: "center",
        },
      ]}
      {...props}
      dataSource={categoryList}
    />
  );
};

export default CategoryTable;
