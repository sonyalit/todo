const router = require('express').Router();

router.get('/user', async (req, res) => {
  const { user } = res.locals;
  if (user) {
    res.json({
      exist: true,
      user: {
        email: user.email,
        username: user.name,
      },
    });
  } else {
    res.json({ exist: false });
  }
});

router.route('/').get((req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('user_uid');
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
