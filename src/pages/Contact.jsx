import React from 'react';
import { useCMSData } from '../hooks/useCMSData';
import { motion } from 'framer-motion';

const Contact = () => {
  const { data, loading, error } = useCMSData("674ec1a12345678900000002");

  if (loading) return <div className="container" style={{paddingTop: '10rem'}}>Loading...</div>;
  if (error) return <div className="container" style={{paddingTop: '10rem'}}>Error: {error}</div>;
  if (!data) return <div className="container" style={{paddingTop: '10rem'}}>No data found.</div>;

  const title = data["674ec1a12345678900000301"]?.value || "";
  const desc = data["674ec1a12345678900000302"]?.value || "";
  const address = data["674ec1a12345678900000303"]?.value || "";
  const email = data["674ec1a12345678900000304"]?.value || "";

  return (
    <div className="contact-page container animate-fade-in" style={{paddingTop: '10rem'}}>
      <motion.div 
        className="glass-card"
        style={{maxWidth: '800px', margin: '0 auto'}}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="gradient-text" style={{fontSize: '3rem', marginBottom: '1rem'}} data-cms-node="674ec1a12345678900000301">{title}</h1>
        <p style={{fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem'}} data-cms-node="674ec1a12345678900000302">{desc}</p>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem'}}>
           <div>
              <h4 style={{color: 'var(--primary)', marginBottom: '0.5rem'}}>Location</h4>
              <p data-cms-node="674ec1a12345678900000303">{address}</p>
           </div>
           <div>
              <h4 style={{color: 'var(--primary)', marginBottom: '0.5rem'}}>Email Us</h4>
              <p data-cms-node="674ec1a12345678900000304">{email}</p>
           </div>
        </div>

        <form style={{marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <input 
            type="text" 
            placeholder="Your Name" 
            style={{background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '0.75rem', color: 'white'}}
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            style={{background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '0.75rem', color: 'white'}}
          />
          <textarea 
            placeholder="Message" 
            rows="5"
            style={{background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '0.75rem', color: 'white', resize: 'none'}}
          ></textarea>
          <button type="submit" className="btn-primary" onClick={(e) => e.preventDefault()}>Send Message</button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
