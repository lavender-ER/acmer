var webpack = require('webpack')

module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                "root.jQuery": "jquery",
                // Semantic-UI
                semantic: 'semantic-ui-css',
                Semantic: 'semantic-ui-css',
                'semantic-ui': 'semantic-ui-css'
            })]
    }
}
