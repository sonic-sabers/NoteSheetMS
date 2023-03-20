var errorService = {
  checkErrors: function (data) {
    if (data && data.message) {
      let message = data.message;
      if (typeof message === 'string' || message instanceof String) {
        message = message.toLowerCase();
        if (message === 'network request failed') {
          return {status: false, msg: 'Please check your network connection.'};
        }
      }
    }

    return data;
  },


};

export default errorService;
