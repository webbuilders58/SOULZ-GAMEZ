const getLogin = (req, res) => {
  res.send("get login");
};

const postLogin = (req, res) => {
  res.send("post login");
};

module.exports = {
    getLogin,
    postLogin
}