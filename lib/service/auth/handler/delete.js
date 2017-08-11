const Handler = require('../../handler');

class DeleteHandler extends Handler {
  constructor(model) {
    super();

    this.model = model;
  }

  async handle(req, res, next) {
    const { id } = req.params;
    const { model } = this;

console.log('ID', id);
    const user = await model.findOne({_id: id});
    if (!user) return res.json({error: `No user with id ${id} found!`});

    user.token = '';
    const result = await user.save();

    return res.json({msg: 'User successful logged out!'});
  }
}

module.exports = DeleteHandler;
