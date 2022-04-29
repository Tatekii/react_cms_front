import { Card, Button, Table, message, Modal, Form, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { reqCategoryList, reqAddCategory, reqUpdateCategory } from "@/api";
import { PAGE_SIZE } from "@/config";
import { saveCategory } from "@/redux/slices/category.slice";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import useMount from "@/hooks/useMount";

export default function Category() {
  const [formRef] = Form.useForm();
  const dispatch = useDispatch();

  const [categoryList, setCategoryList] = useState();
  const [isLoading, setLoading] = useState(true);
  const [editType, setEditType] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [updateModalCurrentId, setUpdateModalCurrentId] = useState("");
  const [updateModalCurrentValue, setUpdateModalCurrentValue] = useState("");

  // 请求并更新
  const getCategoryList = useCallback(async () => {
    const res = await reqCategoryList();
    if (!res) return;
    if (res.status === 0) {
      dispatch(saveCategory(res.data));
      setCategoryList(() => res.data.reverse());
      setLoading(() => false);
    } else {
      message.error("出错了", 2);
    }
  }, [dispatch]);

  useMount(() => {
    getCategoryList();
  });

  /**
   * 显示新增分类的弹窗
   */
  const handleShowAddModal = useCallback(() => {
    setEditType(0);
    setModalVisible(true);
  }, []);

  /**
   * 显示更新分类的弹窗
   */
  const handleShowUpdateModal = useCallback(
    (item: { _id: string; name: string }) => {
      //回显的数据
      const { _id: categoryId, name: categoryName } = item;
      //显示模态框，并将回显数据放到状态中
      setUpdateModalCurrentId(categoryId);
      setUpdateModalCurrentValue(categoryName);
      setEditType(1);
      setModalVisible(true);
      formRef.resetFields();
      //重置表单
    },
    [formRef]
  );

  /**
   * 新增分类
   */
  const handleAddCategory = async (categoryName: string) => {
    const { status } = await reqAddCategory(categoryName);
    if (status === 0) {
      message.success("新增商品分类成功", 1);
      getCategoryList();
      //重置表单
      formRef.resetFields();
      //隐藏模态框
      setModalVisible(false);
    } else {
      message.error("出错了", 1);
    }
  };

  /**
   * 修改分类
   */
  const handleUpdateCategory = async (
    categoryId: string,
    categoryName: string
  ) => {
    const { status } = await reqUpdateCategory(categoryId, categoryName);
    if (status === 0) {
      message.success("更新商品分类成功", 1);
      getCategoryList();
      //重置表单
      formRef.resetFields();
      //隐藏模态框
      setModalVisible(false);
    } else {
      message.error("出错了", 1);
    }
  };

  /**
   * 点击确认
   */
  const handleOkModal = async () => {
    try {
      //表单的统一验证
      const { categoryName } = await formRef.validateFields();
      setLoading(false);
      if (editType === 0) {
        //新增分类的逻辑
        handleAddCategory(categoryName);
      } else {
        //修改分类
        //修改分类的逻辑
        handleUpdateCategory(updateModalCurrentId, categoryName);
      }
    } catch (e) {
      message.error("表单输入有误，请检查", 2);
    }
  };
  /**
   * 点击取消
   */
  const handleCancelModal = () => {
    formRef.resetFields();
    setModalVisible(false);
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
          loading={isLoading}
          rowKey="_id"
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
        />
      </Card>
      {/* 新增分类和修改分类 */}
      <Modal
        title={`${editType === 0 ? "新增" : "修改"}分类`}
        visible={isModalVisible}
        onOk={handleOkModal}
        onCancel={handleCancelModal}
        okText="确认"
        cancelText="取消"
      >
        <Form
          className="login-form"
          form={formRef}
          initialValues={{ categoryName: updateModalCurrentValue }}
        >
          <Form.Item
            name="categoryName"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "请输入商品分类名称",
              },
            ]}
          >
            <Input placeholder="请输入商品分类名称" autoComplete="off" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
