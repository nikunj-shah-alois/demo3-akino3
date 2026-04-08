import { useState, useEffect } from "react";

const API_URL = "http://localhost:8088/service";
const COMPANY_ID = "d167330ed87128df65b0442dz21";
const isLiveEditMode = () =>
  new URLSearchParams(window.location.search).get("liveEdit") === "true";

export const useCMSData = (pageId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.__CMS_PAGE_ID__ = pageId;
    window.__CMS_COMPANY_ID__ = COMPANY_ID;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Step 1: Authentication
        const loginPayload = {
          type: "request",
          endpoint: "auth",
          executor: "login",
          data: [
            { email: "nikunj.shah@akinolabs.com", password: "Password@1" },
          ],
          metadata: { company: { id: COMPANY_ID } },
        };

        const loginFormData = new FormData();
        loginFormData.append("request", JSON.stringify(loginPayload));

        const loginReq = await fetch(API_URL, {
          method: "POST",
          body: loginFormData,
        });

        if (!loginReq.ok) throw new Error("Auth failed");
        const loginRes = await loginReq.json();
        const token = loginRes?.data?.[0]?.token;

        if (!token) throw new Error("No token received");

        // Step 2: Fetch Flattened Page Data
        const pagePayload = {
          endpoint: "contentManager",
          executor: "getFlattenedData",
          data: { id: pageId },
          metadata: { company: { id: COMPANY_ID } },
        };

        const pageFormData = new FormData();
        pageFormData.append("request", JSON.stringify(pagePayload));

        const response = await fetch(API_URL, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: pageFormData,
        });

        if (!response.ok) throw new Error("Content fetch failed");
        const json = await response.json();

        // json.data[0] contains an object with page IDs as keys
        const allData = json.data?.[0];
        let pageData = allData ? allData[pageId] : null;

        if (pageData) {
          const resolvedPageData = { ...pageData };

          // Only apply browser-local overrides while explicitly in live edit mode.
          if (isLiveEditMode()) {
            const overrides = JSON.parse(
              localStorage.getItem("cms_overrides") || "{}",
            );
            Object.keys(overrides).forEach((key) => {
              if (resolvedPageData[key]) {
                resolvedPageData[key] = {
                  ...resolvedPageData[key],
                  value: overrides[key],
                };
              }
            });
          }

          setData(resolvedPageData);
        } else {
          throw new Error(`Data for page ID ${pageId} not found in response`);
        }
      } catch (err) {
        console.error("CMS Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const handleUpdate = (e) => {
      if (!isLiveEditMode()) return;
      const { key, val } = e.detail;
      setData((prev) => {
        if (!prev) return prev;
        const next = { ...prev };
        if (next[key]) {
          next[key] = { ...next[key], value: val };
        }
        return next;
      });
    };

    window.addEventListener("cms_update", handleUpdate);
    if (pageId) fetchData();

    return () => {
      window.removeEventListener("cms_update", handleUpdate);
    };
  }, [pageId]);

  return { data, loading, error };
};
