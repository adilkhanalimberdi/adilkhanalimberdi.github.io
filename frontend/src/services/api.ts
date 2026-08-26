import axios from 'axios';

type Listener = (token: string | null) => void;
let inMemoryToken: string | null = null;
const listeners = new Set<Listener>();

export const setAccessToken = (accessToken: string | null) => {
    inMemoryToken = accessToken;
    listeners.forEach((l) => l(accessToken));
}

export const getAccessToken = () => inMemoryToken;

export const subscribeToToken = (listener: Listener) => {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use(
    (config) => {
        if (inMemoryToken) {
            config.headers.Authorization = `Bearer ${inMemoryToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: any) => void }> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else if (token) prom.resolve(token);
    });
    failedQueue = [];
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (originalRequest.url?.includes("/auth/adminTabs/login") || originalRequest.url?.includes("/auth/refresh")) {
                setAccessToken(null);
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: string) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(api(originalRequest));
                        },
                        reject: (err) => reject(err)
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newAccessToken = await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);
                return api(originalRequest);
            } catch (error) {
                processQueue(error, null);
                window.location.href = "/adminTabs/login";
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
)

let refreshPromise: Promise<string> | null = null;

export const refreshAccessToken = () => {
    if (refreshPromise) return refreshPromise;

    refreshPromise = api.post("/auth/refresh")
        .then((res) => {
            const token = res.data.data.accessToken;
            setAccessToken(token);
            return token;
        })
        .catch((err) => {
            setAccessToken(null);
            throw err;
        })
        .finally(() => {
            refreshPromise = null;
        });

    return refreshPromise;
};