import axios from "axios";

const baseUrl = "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet";

export function getChirps() {
    return axios.get(baseUrl);
}

export function postChirp(chirp) {
    return axios.post(baseUrl,{chirp});
}
