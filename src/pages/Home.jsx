import React from "react";
import { useCMSData } from "../hooks/useCMSData";
import { motion } from "framer-motion";

const HOME_PAGE_ID = "674ec1a12345678900000001";
const HERO_TITLE_ID = "674ec1a12345678900000101";
const HERO_DESC_ID = "674ec1a12345678900000102";
const HERO_IMAGE_ID = "674ec1a12345678900000103";
const FEATURE_COLLECTION_ID = "674ec1a12345678900000200";
const FEATURE_TITLE_ID = "674ec1a12345678900000201";
const FEATURE_DESC_ID = "674ec1a12345678900000202";
const CMS_MEDIA_BASE_URL = "https://curate-media.akinolabs.com/pageManager/";

const resolveSingleMediaUrl = (field) => {
  if (!field) return "";

  const candidates = [];

  if (Array.isArray(field.files)) candidates.push(...field.files);
  else if (field.files) candidates.push(field.files);

  if (Array.isArray(field.value)) candidates.push(...field.value);
  else if (field.value) candidates.push(field.value);

  for (const item of candidates) {
    if (!item) continue;

    if (typeof item === "string") {
      const trimmed = item.trim();
      if (!trimmed) continue;
      return trimmed.startsWith("http")
        ? trimmed
        : `${CMS_MEDIA_BASE_URL}${trimmed.replace(/^\/+/, "")}`;
    }

    if (typeof item === "object") {
      const candidate =
        item.url ||
        item.uri ||
        item.location ||
        item.key ||
        item.etag ||
        item.fileName ||
        item.name;

      if (!candidate) continue;

      return candidate.startsWith("http")
        ? candidate
        : `${CMS_MEDIA_BASE_URL}${candidate.replace(/^\/+/, "")}`;
    }
  }

  return "";
};

const Home = () => {
  const { data, loading, error } = useCMSData(HOME_PAGE_ID);

  if (loading)
    return (
      <div className="container" style={{ paddingTop: "10rem" }}>
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="container" style={{ paddingTop: "10rem" }}>
        Error: {error}
      </div>
    );
  if (!data)
    return (
      <div className="container" style={{ paddingTop: "10rem" }}>
        No data found.
      </div>
    );

  const heroTitle = data[HERO_TITLE_ID]?.value || "";
  const heroDesc = data[HERO_DESC_ID]?.value || "";
  const heroImage = resolveSingleMediaUrl(data[HERO_IMAGE_ID]);
  const features = data[FEATURE_COLLECTION_ID] || [];

  return (
    <div className="home-page">
      <section className="hero container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="gradient-text"
            data-cms-node={HERO_TITLE_ID}
          >
            {heroTitle}
          </h1>
          <p data-cms-node={HERO_DESC_ID}>
            {heroDesc}
          </p>
          <div className="cta">
            <a href="/contact" className="btn-primary">
              Connect With Us
            </a>
          </div>
        </motion.div>
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {heroImage ? (
            <img
              src={heroImage}
              alt="Hero"
              data-cms-node={HERO_IMAGE_ID}
            />
          ) : (
            <div
              data-cms-node={HERO_IMAGE_ID}
              style={{
                padding: "1rem",
                border: "1px solid #fca5a5",
                borderRadius: "1rem",
                background: "#fff1f2",
                color: "#9f1239",
                fontWeight: 600,
              }}
            >
              CMS hero image is missing or invalid.
            </div>
          )}
        </motion.div>
      </section>

      <section className="features container">
        <motion.h2
          className="gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: "3rem", textAlign: "center" }}
        >
          Future-Ready Features
        </motion.h2>
        <div className="features-grid">
          {Array.isArray(features) && features.length > 0 ? (
            features.map((feature, idx) => {
              const itemTitle = feature[FEATURE_TITLE_ID]?.value || "";
              const itemDesc = feature[FEATURE_DESC_ID]?.value || "";
              const collectionId =
                feature.collectionData?.collectionId || FEATURE_COLLECTION_ID;
              const itemId = feature.collectionData?._id || idx;

              return (
                <motion.div
                  key={idx}
                  className="glass-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h3
                    data-cms-node={`${collectionId}:${itemId}:${FEATURE_TITLE_ID}`}
                  >
                    {itemTitle}
                  </h3>
                  <p
                    style={{ color: "var(--text-secondary)" }}
                    data-cms-node={`${collectionId}:${itemId}:${FEATURE_DESC_ID}`}
                  >
                    {itemDesc}
                  </p>
                </motion.div>
              );
            })
          ) : (
            <div
              style={{ textAlign: "center", gridColumn: "1/-1", opacity: 0.5 }}
            >
              No features configured.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
