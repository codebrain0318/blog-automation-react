import config from "../../config/Global";

export const getAllCategories = async (username: string, password: string) => {
    try {
        const url = `${config.sourceBlogUrl}/categories?per_page=100`;

        const response = await fetch(url, {
            headers: {
                'Authorization': 'Basic ' + btoa(`${username}:${password}`)
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        return null;
    } catch (error) {
        return null;
    }
}
