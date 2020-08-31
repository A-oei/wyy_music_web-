import http from "../core/utils/require";

export default {
    get_banner_list(params: { type: number }) {
        return http.get('/banner', params, null)
    }
}

