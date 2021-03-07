import request from "@/utils/request";

export function GetHrefs() {
    return request({
        url: '/href/',
        method: 'get'
    })
}

export function getSingleHref() {
    return request({
        url: 'href',
        method: 'get'
    })
}


