import config from "../../config/Global";
import { BlogGeneralType, BlogType, LanguageType } from "../../config/Types";

export const getAllBlogsService = async (username: string, password: string, page: number = 1, pageCount: number = 5,  search: string = "", column: string = "post_title") => {
    try {
        const url = `${config.sourceBlogUrl}/posts?page=${page}&per_page=${pageCount}&search=${search}&search_columns=${column}`;

        const response = await fetch(url, {
            headers: {
                'Authorization': 'Basic ' + btoa(`${username}:${password}`)
            }
        });

        if (response.ok) {
            const data = await response.json();
            const count = response.headers.get("X-WP-Total");
            return {
                blogs: data.map((blog: { id: string; date: string; date_gmt: string; status: string; comment_status: string; ping_status: string; format: string; slug: string; title: { rendered: string; }; content: { rendered: string; }; excerpt: { rendered: string; }; author: string; categories: string; tags: string; })=>({
                    id: blog.id,
                    date: blog.date,
                    date_gmt: blog.date_gmt,
                    slug: blog.slug,
                    status: blog.status,
                    title: blog.title.rendered,
                    content: blog.content.rendered,
                    // excerpt: blog.excerpt.rendered,
                    // author: blog.author,
                    // categories: blog.categories,
                    // comment_status: blog.comment_status,
                    // ping_status: blog.ping_status,
                    // format: blog.format,
                    // tags: blog.tags,
                })),
                count: count? parseInt(count): 0
            };
        }
        return null;
    } catch (error) {
        return null;
    }
}

export const translateBlogService = async (blog: BlogGeneralType, language: string) => {
    try {
        const url = `${config.baseUrl}/translation/`;
        const data = {
            title: blog.title,
            content: blog.content,
            language: language
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
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

export const getBlogStatusService = async (postIds: string[]) => {
    try{
        const url = `${config.baseUrl}/history/filter`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postIds)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        return null;
    } catch(error) {
        return null;
    }
}

export const sendBlogService = async ( blog: BlogType, language: LanguageType) => {
    try {
        const response = await fetch(language.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${language.username}:${language.password}`)
            },
            body: JSON.stringify({
                title: blog.title,
                content: blog.content,
                date: blog.date,
                date_gmt: blog.date_gmt,
                status: blog.status
            })
        });
        if ( response.ok ) {
            const data = await response.json();
            console.log(data);
            return data;
        }
  } catch (error) {
        console.log(error)
    }
} 

export const getAllBlogsFromOtherService = async (username: string, password: string) => {
    try {
        console.log(username, password)
        const url = `https://surfbrettmagazin.de/wp-json/wp/v2/posts`;

        const response = await fetch(url, {
            headers: {
                'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }
        return null;
    } catch (error) {
        return null;
    }
}


export const sendBlogStatus = async ( postId: string, language: string, targetId: string) => {
    try {
        const url = `${config.baseUrl}/history/`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                postId: postId,
                language: language,
                targetId: targetId
            })
        });
        if ( response.ok ) {
            const data = await response.json();
            console.log(data);
            return data;
        }
  } catch (error) {
        console.log(error)
    }
} 
