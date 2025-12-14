export function goToSingle(url, path, router) {
    let array = url.split("/");
    let id = array[array.length - 2];
    router.push(`/${path}/${id}`);
}
