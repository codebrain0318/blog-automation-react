import config from "../../config/Global"
import TableModel from "../../utils/TableModel/TableModel"

type ObjectType = {
    [key: string] : string
}

export const uploadExcelService = async (formData: FormData) => {
    try {
        const str_auth_user = localStorage.getItem("auth_user");
        if (!str_auth_user) return null;
        const auth_user = JSON.parse(str_auth_user);

        const response = await fetch(`${config.baseUrl}/excel/upload`, {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${auth_user.token}`
            },
        })
        if (response.ok) {
            return "success"
        }
        return null;
    } catch (error) {
        return null;
    }
}

export const createDataService = async (data: TableModel) => {
    try {
        const str_auth_user = localStorage.getItem("auth_user");
        if (!str_auth_user) return null;
        const auth_user = JSON.parse(str_auth_user);
        const response = await fetch(`${config.baseUrl}/excel`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth_user.token}`
            },
            body: JSON.stringify({
                cols: data.columns,
                rows: data.rows
            })
        })
        if (response.ok) {
            return "success"
        }
        return null;
    } catch (error) {
        return null;
    }
}

export const createPartService = async (data: ObjectType[], isStart: boolean) => {
    try {
        const str_auth_user = localStorage.getItem("auth_user");
        if (!str_auth_user) return null;
        const auth_user = JSON.parse(str_auth_user);
        const response = await fetch(`${config.baseUrl}/excel/part`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth_user.token}`
            },
            body: JSON.stringify({
                data: data,
                isstart: isStart
            })
        })
        if (response.ok) {
            return "success"
        }
        return null;
    } catch (error) {
        return null;
    }
}

export const getDataService = async (
    column: string = "",
    search: string = "",
    page: number = 1,
    show_page: number = 5,
    sort_column: string = "No",
    sort_direction: number = 1
  ) => {
    try {
        const str_auth_user = localStorage.getItem("auth_user");
        if (!str_auth_user) return null;
        const auth_user = JSON.parse(str_auth_user);
        const response = await fetch(`${config.baseUrl}/excel?column=${column}&search=${search}&page=${page}&show_page=${show_page}&sort_column=${sort_column}&sort_direction=${sort_direction}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth_user.token}`
            }
        })
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export const updateDateService = async (rowNo: string, column: string, value: string) => {
    try {
        const str_auth_user = localStorage.getItem("auth_user");
        if (!str_auth_user) return null;
        const auth_user = JSON.parse(str_auth_user);
        const response = await fetch(`${config.baseUrl}/excel`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth_user.token}`
            },
            body: JSON.stringify({
                row_no: parseInt(rowNo),
                column: column,
                value: value
            })
        })
        if (response.ok) {
            return "success"
        }
        return null;
    } catch (error) {
        return null;
    }
}

// export const getDataService = async () => {
//     try {
//         const str_auth_user = localStorage.getItem("auth_user");
//         if (!str_auth_user) return null;
//         const auth_user = JSON.parse(str_auth_user);
//         const response = await fetch(`${config.baseUrl}/excel`, {
//             method: "get",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${auth_user.token}`
//             }
//         })
//         if (response.ok) {
//             const data = await response.json();
//             return data;
//         }
//         return null;
//     } catch (error) {
//         return null;
//     }
// }
// export const updateDateService = async (row: string[]) => {
//     try {
//         const str_auth_user = localStorage.getItem("auth_user");
//         if (!str_auth_user) return null;
//         const auth_user = JSON.parse(str_auth_user);
//         const response = await fetch(`${config.baseUrl}/excel`, {
//             method: "put",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${auth_user.token}`
//             },
//             body: JSON.stringify({
//                 row: row
//             })
//         })
//         if (response.ok) {
//             return "success"
//         }
//         return null;
//     } catch (error) {
//         return null;
//     }
// }