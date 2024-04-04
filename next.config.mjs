/** @type {import('next').NextConfig} */
const nextConfig = {
     
      swcMinify: true,
      images: {
        domains: ['res.cloudinary.com']
      },
      webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Override the default domain based on the environment
        if (dev) {
          process.env.NEXT_PUBLIC_DOMAIN = 'http://localhost:5000';
        } else {
          process.env.NEXT_PUBLIC_DOMAIN = 'https://clinetapi.onrender.com';
        }
        return config;
      },
    
   
  };
  
  export default nextConfig;
  