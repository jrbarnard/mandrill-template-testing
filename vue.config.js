const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    configureWebpack: {
        output: {
            publicPath: ASSET_PATH,
        },
    },
};