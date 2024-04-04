import apiService from "./Api";

// Example API function
export async function fetchData(api) {
    // console.log("apiapiapi::", api)
    try {
        const response = await apiService.get(api);
        // console.log("RESSS::::", response)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

// Example API function
export async function addEvents(api) {
    // console.log("apiapiapi::", api)
    try {
        const response = await apiService.get(api);
        // console.log("RESSS::::", response)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}