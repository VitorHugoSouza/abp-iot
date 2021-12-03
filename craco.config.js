const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
                '@primary-color': '#00A091',
                '@link-color': '#398f1f', // link color
                '@success-color': '#52c41a', // success state color
                '@warning-color': '#faad14', // warning state color
                '@error-color': '#f5222d', // error state color
                '@font-size-base': '14px', // major text font size
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};