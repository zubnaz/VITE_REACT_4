import { useNavigate } from "react-router-dom";
import { ICategoryCreate, IUploadedFile } from "./types.ts";
import {Button, Form, FormProps, Input, Row, Upload} from "antd";
import { Link } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { PlusOutlined } from '@ant-design/icons';
import http_common from "../../http_common.ts";

const CategoryCreatePage = () => {
    const navigate = useNavigate();

    const [form] = Form.useForm<ICategoryCreate>();
    const onFinish: FormProps<ICategoryCreate>["onFinish"] = async (values) => {
        try {

            await http_common.post("/api/categories/create", values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        }
        catch (ex) {
            console.log("Exception create category", ex);
        }
    };


    return (
        <>
            <h1>Додати категорію</h1>
            <Row gutter={16}>
                <Form form={form}
                    onFinish={onFinish}
                    layout={"vertical"}
                    style={{
                        minWidth: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: 20,
                    }}
                >

                    <Form.Item
                        label={"Назва"}
                        name={"name"}
                        htmlFor={"name"}
                        rules={[
                            { required: true, message: "Це поле є обов'язковим!" },
                            { min: 3, message: "Довжина поля 3 символи" }
                        ]}
                    >
                        <Input autoComplete="name" />
                    </Form.Item>

                    <Form.Item
                        label={"Опис"}
                        name={"description"}
                        htmlFor={"description"}
                        rules={[
                            { required: true, message: "Це поле є обов'язковим!" },
                            { min: 10, message: "Довжина поля 10 символи" }
                        ]}
                    >
                        <TextArea />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Фото"
                        valuePropName="image"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            console.log(e?.file);
                            const _file = e?.file;
                            return _file;
                        }}
                        rules={[{ required: true, message: 'Оберіть фото категорії!' }]}
                    >
                        <Upload
                            showUploadList={{ showPreviewIcon: false }}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={1}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>

                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button  style={{ margin: 10 }} type="primary" htmlType="submit">
                            Створити
                        </Button>
                        <Link to={"/admin"}>
                            <Button style={{ margin: 10 }} htmlType="button">
                                Скасувати
                            </Button>
                        </Link>
                    </Row>

                </Form>
            </Row>
        </>
    );
}

export default CategoryCreatePage;
