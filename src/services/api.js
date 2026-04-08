import magicJson from "../magicJson/magicJson";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8088/service";
const TOKEN = import.meta.env.VITE_TOKEN;

/**
 * Service to fetch unflattened page data from CMS API
 * @param {string} pageId 
 * @returns {Promise<object>} Unflattened page data
 */
export const getFlattenedPageData = async (pageId) => {
    try {
        const requestObj = { ...magicJson };
        requestObj.endpoint = "contentManager";
        requestObj.executor = "getFlattenedData";
        requestObj.data = { id: pageId, language: "en" };

        const formData = new FormData();
        formData.append("request", JSON.stringify(requestObj));

        const headers = {};
        if (TOKEN) {
            headers["Authorization"] = `Bearer ${TOKEN.replace(/"/g, '')}`;
        }

        const response = await fetch(API_URL, {
            method: "POST",
            body: formData,
            headers: headers
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API ${response.status}: ${errorText || response.statusText}`);
        }

        const result = await response.json();

        if (result && result.data && result.data.length > 0) {
            const pageData = result.data[0][pageId];
            if (pageData) return pageData;
            throw new Error("Page ID not found in API response structure");
        }

        throw new Error("Invalid API response format");
    } catch (error) {
        console.error("CMS API Request Failed:", error);
        throw error;
    }
};

export default {
    getFlattenedPageData
};
