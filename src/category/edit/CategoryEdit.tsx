import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Form, FormProps, Input, Row, Upload, UploadFile} from "antd";
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
    const [file, setFile] = useState<UploadFile|null>();

    const onFinish: FormProps<ICategoryEdit>["onFinish"] = async (values) => {

        console.log(values);
        const category:ICategoryEdit={
            id:id,
            name:values.name,
            description:values.description,
            image:values.image
        }

        try {
            await http_common.put("/api/categories/edit", category, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/admin');
        } catch (ex) {
            console.log("Exception create category", ex);
        }
    }

    useEffect(() => {
        http_common.get<ICategoryShow>(`http://localhost:8080/api/categories/find_by_id/${id}`)
            .then(resp => {
                const { data } = resp;
                form.setFieldsValue(data);

                setFile(
                    {
                        uid: '-1',
                        name: data.image,
                        status: 'done',
                        url: `/uploading/300_${data.image}`,
                    });


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
                        name="id"
                        hidden
                    />

                    <Form.Item
                        label="Назва"
                        name="name"
                        htmlFor="name"
                        rules={[
                            {min: 3, message: 'Назва повинна містити мінімум 3 символи!'},
                        ]}
                    >
                        <Input autoComplete="name"/>
                    </Form.Item>

                    <Form.Item
                        label="Опис"
                        name="description"
                        htmlFor="description"
                        rules={[
                            {min: 10, message: 'Опис повинен містити мінімум 10 символів!'},
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>

                    <Form.Item
                        name="file"
                        label="Фото"
                        valuePropName="file"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            const image = e?.fileList[0] as IUploadedFile;
                            return image?.originFileObj;
                        }}
                    >
                        <Upload
                            showUploadList={{showPreviewIcon: false}}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={1}
                            fileList={file ? [file] : []}
                            onChange={(data) => {
                                setFile(data.fileList[0]);
                            }}

                        >
                            <div>
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Обрати нове фото</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Зберегти
                        </Button>
                        <Button style={{margin: 10}} htmlType="button" onClick={() => {
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