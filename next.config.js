const path = require('path')
const nextImages = require('next-images') //used as a wrapper to import svgs directly in Next.js

module.exports = nextImages({
  webpack: config => {
    config.resolve.alias['@assets'] = path.resolve(__dirname, '.', 'assets')
    config.resolve.alias['@components'] = path.resolve(__dirname, '.', 'components')
    config.resolve.alias['@contexts'] = path.resolve(__dirname, '.', 'contexts')
    config.resolve.alias['@utils'] = path.resolve(__dirname, '.', 'utils')

    return config
  },
})
