const getRegister = (req, res) => {
  res.send("get register");
};

const postRegister = (req, res) => {
  res.send("post register");
};

module.exports ={
    getRegister,
    postRegister
}