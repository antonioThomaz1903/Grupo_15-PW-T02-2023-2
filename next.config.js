/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['cdn2.thecatapi.com'], // Adicione o host externo aqui
    
  },
}

module.exports = nextConfig;
    

