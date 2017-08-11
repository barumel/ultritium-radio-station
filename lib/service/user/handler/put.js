const Handler = require('../../handler');

class PutHandler extends Handler {
  constructor(model) {
    super();

    this.model = model;
  }

  async handle(req, res, next) {
    const { model } = this;
    const { id } = req.params;

    try {
      let user = await model.findById(id);
      if (!user) return res.status(404).json({msg: `User with id ${id} not found!`});

      const result = await model.update({_id: id}, req.body);
      user = await model.findById(id);

      return res.json(user);
    } catch(err) {
      res.status(500).json({msg: err});
    }
  }
}

module.exports = PutHandler;
