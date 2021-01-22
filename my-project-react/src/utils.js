const API_URL="http://178.248.1.62:8080";

export const callApi = async (path, method, body) => {
    const response = await fetch(`${API_URL}${path}`, {
        method,
        headers:{
            "content-type": "application/json"
        },
        credentials: "include",
        
        body: JSON.stringify(body)
    })
    const data = await response.json();

    return data;
}