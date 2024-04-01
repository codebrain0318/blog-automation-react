import config from "../../config/Global";

export const loginService = async (username: string, password: string) => {
    try {
        const url = `${config.sourceBlogUrl}/posts`;

        const response = await fetch(url, {
            headers: {
                'Authorization': 'Basic ' + btoa(`${username}:${password}`)
            }
        });

        if (response.ok) {
            return "success";
        }
        return null;
    } catch (error) {
        return null;
    }
}