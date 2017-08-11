const _ = require('lodash');
const Handler = require('../../handler');
const RadioStream = require('ultritium-radio-stream');
const util = require('util');

function getQuery(type, value) {
  const queries = {
    title: {title: new RegExp(value, 'i')},
    recent: { sort: { createdAt: -1 }, limit: 6 },
    popular: {},
    default: {}
  }

  const query = queries[type] || queries.default;

  return query;
}

class AllHandler extends Handler {
  constructor(model) {
    super();

    this.model = model;
  }

  async handle(req, res, next) {
    // Get the query from request and parse
    let { query='{}'} = req.query;
    query = JSON.parse(query);

    const { type='find', value={} } = query;
    const { model } = this;
    const method = model[type];

    if (!_.isFunction(method)) return res.json({error: `No Method found to handle ${type}`});

    try {
      const result = await method.call(model, value);
      return res.json(result);
    } catch(err) {
      return res.json({error: `Error in all action ${err}`});
    }
  }
}

module.exports = AllHandler;
