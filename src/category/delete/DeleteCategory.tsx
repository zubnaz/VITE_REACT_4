import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http_common from "../../http_common";

export default function DeleteCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const deleteCategory = async () => {
        await http_common.delete(`api/categories/delete/${id}`);
    };

    const exit = async () => {
        await navigate(-1);
    };

    useEffect(() => {
        const deleteAndExit = async () => {
            await deleteCategory();
            await exit();
        };

        deleteAndExit();
    }, [id, navigate]);
    return (null);
}