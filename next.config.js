module.exports = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true
    },
    env: {
        API_HOST: process.env.API_HOST,
        AWS_REGION: process.env.AWS_REGION,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        API_HOST_OFERTAS_AVULSAS: process.env.API_HOST_OFERTAS_AVULSAS
    },
    i18n: {
        locales: ['pt-BR', 'en-US'],
        defaultLocale: 'pt-BR'
    }
}