/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects(){
        return[
          {
            source: '/',
            destination: '/dasbor',
            permanent: false,
          },
        ];
      },
};

export default nextConfig;
