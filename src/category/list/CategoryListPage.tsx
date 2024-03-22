import {Button, Col, Empty, Form, Input, Pagination, Row} from "antd";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import http_common from "../../http_common";
import CategoryCard from "./CategoryCard";
import { ICategorySearch, IGetCategories } from "./IGetCategories";
import {getLocalStorage} from "../../utils/storage/localStorageUtils.ts";
import {isTokenActive} from "../../utils/storage/isTokenActive.ts";
import {DeleteOutlined} from "@ant-design/icons";

const CategoryListPage = () => {
    //const path = `/uploading/150_`;
    //const [dataSource, setDataSource] = useState<any>([]);
    const [data, setData] = useState<IGetCategories>({
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0
    }); // хук, що приймає і показує дані що приходять з сервера

    const [searchParams, setSearchParams] = useSearchParams();

    const [formParams, setFormParams] = useState<ICategorySearch>({
        name: searchParams.get('name') || "",
        description: searchParams.get('description') || "",
        page: Number(searchParams.get('page')) || 1,
        size: Number(searchParams.get('size')) || 2
    }); // хук для форми, з сторінками, кількістю елементів, які виводяться на одній сторінці, інпути з назвою і описом для пошуку


    const { content, totalElements } = data; // витягуємо content, totalElements з об'єкта data
    const uploadData = async () => {
        http_common.get<IGetCategories>("/api/categories/search", {
            params: {
                ...formParams,
                page: formParams.page - 1
            } // передаємо параметри для запиту
        })
            .then(resp => {
                setData(resp.data);
                form.setFieldsValue(formParams);// записуємо дані в інпути
            });
    }

    useEffect(() => { uploadData() }, [formParams]);

    const [form] = Form.useForm<ICategorySearch>();// форма для інпутів пошуку

    const onSubmit = async (values: ICategorySearch) => {
        findCategories({ ...formParams, page: 1, name: values.name, description: values.description }); // при натиску на кнопку передаємо в findCategories сторінку першу, назву і опис, розмір сторінки залишається незмінним
    }

    const handleDelete = (id: number) => {
        console.log("Delete item : " + id);
    }
    const handlePageChange = async (page: number, newPageSize: number) => {
        findCategories({ ...formParams, page, size: newPageSize });// передаємо новий розмір і номер сторінки
    };

    const findCategories = (model: ICategorySearch) => {
        setFormParams(model); // сетимо нову форму
        updateSearchParams(model); //виводимо в URL дані сторінки
    }

    const updateSearchParams = (params: ICategorySearch) => {
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== 0 && value != "") {
                searchParams.set(key, value);
            } else {
                searchParams.delete(key);
            }
        }
        setSearchParams(searchParams);
    };
    const SortByName = () => {
        http_common.get<IGetCategories>("http://localhost:8080/api/categories/sort_name", {
            params: {
                ...formParams,
                page: formParams.page - 1
            }
        })
            .then(resp => {
                console.log("Items", resp.data);
                setData(resp.data);
                form.setFieldsValue(formParams);
            });
    }
    const SortByDescription = () => {
        http_common.get<IGetCategories>("http://localhost:8080/api/categories/sort_description", {
            params: {
                ...formParams,
                page: formParams.page - 1
            }
        })
            .then(resp => {
                console.log("Items", resp.data);
                setData(resp.data);
                form.setFieldsValue(formParams);
            });
    }
    const Cancel = () => {
        form.resetFields();
        findCategories({ ...formParams, name: "", description: "" });
    }
    return (
        <>
            <h1>Список категорій</h1>

            {!isTokenActive(getLocalStorage('authToken'))?(<Empty description={"Потрібна аутентифікація!"}></Empty> ):(<><Row gutter={16} >
                {window.location.pathname=="/admin"?<>
                <Link to={`category/create`}>
                    <Button style={{margin:20}} type="primary">
                        Створити категорію
                    </Button>
                </Link>
                </>
                :
                    ""
                }
                <Form form={form} onFinish={onSubmit} layout={"vertical"}
                      style={{
                          minWidth: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'start',
                          padding: 20,
                          rowGap: 5

                      }}
                >
                    <Form.Item

                        name="name"
                        htmlFor="name"
                        style={{ flex: 1 }}
                    >
                        <Input autoComplete="name" placeholder="Назва" />
                    </Form.Item>

                    <Form.Item

                        name="description"
                        htmlFor="description"
                        style={{ flex: 1 }}

                    >
                        <Input autoComplete="description" placeholder="Опис" />
                    </Form.Item>
                    <Row gutter={16} style={{ columnGap: 5 }}>
                        <Button type="primary" htmlType="submit">
                            Пошук
                        </Button>
                        <Button type="primary" onClick={Cancel}>
                            Скасувати
                        </Button>
                        <Button type="primary" onClick={SortByName}>
                            Сортувати за назвою
                        </Button>
                        <Button type="primary" onClick={SortByDescription}>
                            Сортувати за описом
                        </Button>
                    </Row>

                </Form>
            </Row>

                <Row gutter={16}>
        <Col span={24}>
            <Row>
                {content.length === 0 ? (
                    <h2>Список пустий</h2>
                ) : (
                    content.map((item: any) =>
                        <CategoryCard key={item.id} item={item} handleDelete={handleDelete} />,
                    )
                )}
            </Row>
        </Col>
        </Row>
    <Row style={{ width: '100%', display: 'flex', marginTop: '25px', justifyContent: 'center' }}>
        <Pagination
            showTotal={(total, range) => {
                console.log("range ", range);
                return (`${range[0]}-${range[1]} із ${total} записів`);
            }}
            current={formParams.page}
            defaultPageSize={formParams.size}
            total={totalElements}
            onChange={handlePageChange}
            pageSizeOptions={[1, 2, 5, 10]}
            showSizeChanger
        />
    </Row>
    </>)}

        </>
    )
}

export default CategoryListPage;
