import React, {Component, Fragment} from 'react';
import {Upload, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {BASE_URL} from "../../../config";
import {reqDeletePicture} from "../../../api";
import store from "../../../redux/store";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends Component {
    state = {
        previewVisible: false, //是在展示预览窗
        previewImage: '', //要预览的图片的地址或base64地址
        previewTitle: '',
        fileList: [],
    };

    //关闭预览窗
    handleCancel = () => this.setState({previewVisible: false});

    //展示预览窗
    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    //获取该商品对应的图片名字，构建一个数字，供新增商品使用
    getImgArr = () => {
        let result = [];
        const {fileList} = this.state;
        fileList.forEach(file => {
            result.push(file.name);
        })
        return result;
    }

    //回显图片
    setImgArr = (imgs) => {
        let fileList = [];
        imgs.forEach((img, index) => {
            let file = {
                uid: -index,
                name: img,
                url: `${BASE_URL}/upload/${img}`
            };
            fileList.push(file);
        })
        this.setState({
            fileList
        })
    }


    //图片状态发生改变的回调
    handleChange = async ({file, fileList}) => {
        //如果文件上传成功
        if (file.status === 'done') {
            const {status, data} = file.response;
            if (status === 0) {
                const {url, name} = data;
                file.url = url;
                file.name = name;
            }
        } else if (file.status === 'removed') {
            //获取要删除文件的名称
            const {name} = file;
            //删除图片
            const {status, msg} = await reqDeletePicture(name);
            if (status === 0) {
                message.success("文件删除成功", 2);
            } else {
                message.error(msg, 2);
            }

        }
        this.setState({fileList})
    };

    render() {
        const {previewVisible, previewImage, fileList, previewTitle} = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined/>
                <div style={{marginTop: 8}}>Upload</div>
            </div>
        );
        let token = store.getState()?.login?.token;
        token = `bearer ${token}`;
        return (
            <Fragment>
                <Upload
                    action={`${BASE_URL}/manage/img/upload`} //action：接收图片服务器的地址
                    method={"POST"}
                    name="image"
                    listType="picture-card" //listType：照片墙的展示方式
                    fileList={fileList} // fileList：图片列表 {uid:xxx,name:xxx,status:xxx,url:xxx}
                    onPreview={this.handlePreview} //onPreview：点击预览按钮的回调
                    onChange={this.handleChange} //onChange：图片状态改变的回调（图片上传中，图片被删除、图片成功上传）
                    headers={{Authorization: token}} //上传所需额外参数或返回上传额外参数的方法
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </Fragment>
        );
    }
}
