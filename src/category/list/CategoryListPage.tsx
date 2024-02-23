import { Button, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http_common from "../../http_common";
import { ICategoryShow } from "./ICategoryShow";

const CategoryListPage = () => {
    const path = `/uploading/150_`;
    const [dataSource, setDataSource] = useState<any>([]);
    const columns = [
        {
            title: "Id",
            dataIndex: "id"
        },
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Description",
            dataIndex: "description"
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (imageURL: string) => <img src={path + imageURL} />
        },
        {
            title: "",
            render: (record: any) => (
                <Row style={{ display: 'flex', columnGap: '13px' }}>
                    <Link to={`/category/edit/${record.id}`}><Button >Редагувати</Button></Link>
                    <Link to={`/category/delete/${record.id}`}><Button danger>Видалити</Button></Link>
                </Row>
            )
        }
    ];
    const uploadData = async () => {
        const resp = (await http_common.get<ICategoryShow>("http://localhost:8080/api/categories")).data;
        setDataSource(resp);

    }

    useEffect(() => { uploadData() }, []);
    return (
        <>
            <h1>Список категорій</h1>
            <Link to={"/category/create"}>
                <Button style={{ margin: '13px' }} size={"large"}>Додати</Button>
            </Link>
            <Table columns={columns} dataSource={dataSource}></Table>
        </>
    )
}

export default CategoryListPage;