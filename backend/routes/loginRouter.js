const router = require('express').Router();

const bcrypt = require('bcrypt');

const { User } = require('../db/models');

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(401).json({ login: false, message: 'Неправильные username или пароль' });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare && user.username === username) {
      res.status(401).json({ login: false, message: 'Неправильные username или пароль' });
    }
    req.session.userId = user.id;
    res.json({
      login: true,
      user: {
        email: user.email, username: user.name,

      },
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
