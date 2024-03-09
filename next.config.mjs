/** @type {import('next').NextConfig} */
const nextConfig = {
      experimental: {
        forceSwcTransforms: true,
      },
      swcMinify: true,
      images: {
        domains: ['res.cloudinary.com']
      },
    
   
  };
  
  export default nextConfig;
  