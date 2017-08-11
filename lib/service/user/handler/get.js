const Handler = require('../../handler');

class GetHandler extends Handler {
  constructor(model) {
    super();

    this.model = model;
  }

  async handle(req, res, next) {
    const { model } = this;
    const { id } = req.params;

    try {
      let result = await model.findById(id).populate({ path: 'favorites'}).exec();
      result = result.toObject();
      delete result.password;

      return res.json(result)
    } catch(err) {
      return res.json({error: `Error getting user with id ${id}: ${err}`});
    }
  }
}

module.exports = GetHandler;
