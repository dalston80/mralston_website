export const getURLPath = (absolutePath) => {
    const linkUrl = absolutePath
    const url = new URL(linkUrl)
    return url.pathname
}