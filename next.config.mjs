/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'graph.facebook.com',
      's.gravatar.com',
      'images.unsplash.com',
      'firebasestorage.googleapis.com',
      'localhost',
    ],
  },
};

export default nextConfig;