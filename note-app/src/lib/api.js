const baseUrl = "http://localhost:3001";

const defaultOptions = {
    headers: {
        "Content-Type": "application/json",
    },
};

const apiFetch = async (URL, options) => {
    return await fetch(`${baseUrl}${url}`, {
        ...defaultOptions,
        ...options,
    });
};

const noteAPI = {
    async getAll() {
        const result = await apiFetch('/notes', { method: 'GET' });
        if (!result.ok) {
            throw new Error(`メモ一覧の取得に失敗しました：${result.status}`)

            return result.json();
        }
    },

    async create(data) {
        const result = await apiFetch("/notes", {
            method: "POST",
            body: JSON.stringify(data),
        });

        if (!result.ok) {
            throw new Error(`メモの作成に失敗しました：${result.status}`);
        }

        return result.json();
    },
};

export default noteAPI;