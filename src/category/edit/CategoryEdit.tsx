import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Row, Upload, UploadFile } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadChangeParam } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import http_common from "../../http_common.ts";
import { IUploadedFile } from "../create/types.ts";
import { ICategoryEdit, IUploadImage } from "./ICategoryEdit.ts";
import { ICategoryShow } from "../list/ICategoryShow.ts";

const CategoryEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm<ICategoryEdit>();
    const [file, setFiles] = useState<UploadFile[] | null>([]);

    const onSubmit = async (values: ICategoryEdit) => {

        console.log(values);
        try {
            await http_common.put("/api/categories/edit", values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        } catch (ex) {
            console.log("Exception create category", ex);
        }
    }

    useEffect(() => {
        http_common.get<ICategoryShow>(`http://localhost:8080/api/categories/find_by_id/${id}`)
            .then(resp => {
                const { data } = resp;
                form.setFieldsValue(data);

                const imgs = data.images.map((photo) => ({

                    uid: `${photo.id}`,
                    name: photo.name,
                    status: 'done',
                    url: `/uploading/300_${photo.name}`
                }));
                setFiles(imgs);


            })
            .catch(error => {
                console.log("Error server ", error);
            });
    }, [id]);


    return (
        <>
            <h1>Редагування категорію</h1>
            <Row gutter={16}>
                <Form form={form}
                    onFinish={onSubmit}
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
                        name="id"
                        hidden
                    />

                    <Form.Item
                        label="Назва"
                        name="name"
                        htmlFor="name"
                        rules={[
                            { required: true, message: 'Це поле є обов\'язковим!' },
                            { min: 3, message: 'Назва повинна містити мінімум 3 символи!' },
                        ]}
                    >
                        <Input autoComplete="name" />
                    </Form.Item>

                    <Form.Item
                        label="Опис"
                        name="description"
                        htmlFor="description"
                        rules={[
                            { required: true, message: 'Це поле є обов\'язковим!' },
                            { min: 10, message: 'Опис повинен містити мінімум 10 символів!' },
                        ]}
                    >
                        <TextArea />
                    </Form.Item>

                    <Form.Item
                        name="file"
                        label="Фото"
                        valuePropName="file"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            const fileList = file as UploadFile[];
                            console.log("Files : " + fileList)
                            const files: File[] = fileList.map(file => file.originFileObj);
                            console.log("Files 2 : " + fileList)
                            return files;
                        }}
                    >
                        <Upload
                            showUploadList={{ showPreviewIcon: false }}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={7}
                            fileList={file}
                            onChange={(data) => {
                                console.log(data.fileList);
                                const newFiles = data.fileList.filter(file => file.status === 'done'); // Фільтруємо файли, щоб відфільтрувати тільки завантажені
                                if (file !== null) {
                                    setFiles(prevFiles => [...prevFiles, ...newFiles]); // Додаємо нові файли до попередніх
                                }
                            }}

                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Обрати нове фото</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button style={{ margin: 10 }} type="primary" htmlType="submit">
                            Зберегти
                        </Button>
                        <Button style={{ margin: 10 }} htmlType="button" onClick={() => {
                            navigate('/')
                        }}>
                            Скасувати
                        </Button>
                    </Row>
                </Form>
            </Row>

        </>
    )
}

export default CategoryEditPage;