import { Button, Form, Input, Row } from "antd";
import { ICategoryEdit, IUploadedFile } from "./ICategoryEdit";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import Upload, { UploadChangeParam } from "antd/es/upload";
import { PlusOutlined } from '@ant-design/icons';
import http_common from "../../http_common";
export default function CategoryEdit() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm<ICategoryEdit>();
    const onHandlerSubmit = async (values: ICategoryEdit) => {
        const getCateg = (await http_common.get<ICategoryEdit>(`api/categories/find_by_id/${id}`)).data;

        const editCateg: ICategoryEdit = {
            id: parseInt(id),
            name: values.name == undefined || values.name.length == 0 || values.name == getCateg.name ? "" : values.name,
            description: values.description == undefined || values.description.length == 0 || values.description == getCateg.description ? "" : values.description,
            image: values.image
        }

        await http_common.put("api/categories/edit", editCateg, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        navigate("/");
    }
    return (<>
        <h1>Оновити категорію # {id}</h1>
        <Row gutter={16}>
            <Form form={form}
                onFinish={onHandlerSubmit}
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
                        { required: false },
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
                        { required: false },
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
                        const image = e?.fileList[0] as IUploadedFile;
                        return image?.originFileObj;
                    }}
                    rules={[{ required: false }]}
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
                    <Button style={{ margin: 10 }} type="primary" htmlType="submit">
                        Редагувати
                    </Button>
                    <Link to={"/"}>
                        <Button style={{ margin: 10 }} htmlType="button">
                            Скасувати
                        </Button>
                    </Link>
                </Row>
            </Form>
        </Row>
    </>);
}