import { Card, Button, Table, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { reqCategoryList } from "@/api";
import { PAGE_SIZE } from "@/config";
import { saveCategory } from "@/redux/slices/category.slice";
import { useState } from "react";
import useMount from "@/hooks/useMount";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import UpdateModal from "./UpdateModal";

export default function Category() {
  const dispatch = useAppDispatch();
  const categoryList = useAppSelector((state) => state.category);

  const [isLoading, setLoading] = useState<boolean>(true);
  const [editType, setEditType] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [updateModalCurrent, setUpdateModalCurrent] = useState({
    categoryId: "",
    categoryName: "",
  });

  // mount
  useMount(() => {
    getCategoryList();
  });

  // 请求分类数据
  const getCategoryList = async () => {
    setLoading(true);
    const res = await reqCategoryList();
    if (!res) return;
    const { status, data } = res;
    if (status === 0) {
      dispatch(saveCategory(data));
      setLoading(false);
    } else {
      message.error("出错了", 2);
    }
  };

  /**
   * 显示新增分类的弹窗
   */
  const handleShowAddModal = () => {
    console.log(123);

    setEditType(0);
    setModalVisible(true);
  };

  /**
   * 显示更新分类的弹窗
   */
  const handleShowUpdateModal = (item: { _id: string; name: string }) => {
    // 回显的数据
    const { _id: categoryId, name: categoryName } = item;
    // 显示模态框，并将回显数据放到状态中
    setUpdateModalCurrent({ categoryId, categoryName });
    // 编辑状态为1
    setEditType(1);
    setModalVisible(true);
    //重置表单
  };

  return (
    <div>
      <Card
        extra={
          <Button
            type="primary"
            onClick={handleShowAddModal}
            icon={<PlusCircleOutlined />}
          >
            添加
          </Button>
        }
      >
        <Table
          bordered={true}
          dataSource={categoryList}
          loading={isLoading}
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
              render: (item: any) => (
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
        />
      </Card>
      <UpdateModal
        visible={isModalVisible}
        setLoading={setLoading}
        editType={editType}
        updateModalCurrent={updateModalCurrent}
        getCategoryList={getCategoryList}
        setModalVisible={setModalVisible}
      />
    </div>
  );
}
