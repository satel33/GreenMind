const log = async (context, params) => {
  context.$winstonLog.log(params);
};

module.exports = log;
