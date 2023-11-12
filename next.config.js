/** @type {import('next').NextConfig} */

  module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/products', // اسم الصفحة التي تريد تحويل المستخدم إليها
          permanent: true,
        },
      ];
    },
  };
  module.exports = {
    images: {
      domains: ['reqres.in', 'i.dummyjson.com'],
     
    },
  };