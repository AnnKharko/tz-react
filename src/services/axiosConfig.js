import axios from "axios";

export const AXIOS = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTE5NmY1YTMzMWZkZjJjN2Y4ZWYxYTIyZGU0ZjNkZiIsInN1YiI6IjVmZmU5MzQ0YWQ1OWI1MDAzZGZhY2FhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O-8eOZnqPDxVVDz8wUbo-Qc7CNEXpApljWl99fEMQYI '
    }
})