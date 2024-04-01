export type LanguageType = {
    id: number,
    name: string,
    url: string,
    username: string,
    password: string
}

export const getInitialLanguage = () => {
    return {
        id: -1,
        name: "",
        url: "",
        username: "",
        password: ""
    }
}

export type DictionaryType = {
    id: number,
    language: string,
    badEntry: string,
    rightEntry: string
}

export const getInitialDictionary = () => {
    return {
        id: -1,
        language: "",
        badEntry: "",
        rightEntry: ""
    }
}

export type AutomationStatusType = {
    language: string,
    sent: boolean,
    targetId: string
}

export const getInitialAnimationStatus = () => {
    return {
        language: "",
        isSent: false,
        targetId: "-1"
    }
}

export type BlogType = {
    id: string,
    date: string,
    date_gmt: string,
    slug: string,
    status: string,
    title: string,
    content: string,
}

export const getInitialBlog = () => {
    return {
        id: "",
        date: "",
        date_gmt: "",
        slug: "",
        status: "",
        title: "",
        content: ""
    }
}

export type BlogGeneralType = {
    [key: string]: string | number
}