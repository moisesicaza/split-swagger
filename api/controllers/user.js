const getUser = async (req, res) => {
    res.send({
      status: "OK",
      code: 200,
      message: "Success",
      data: {
        publicId: "8227b0c0-c059-4520-8537-1af221ed1201",
        firstName: "User",
        lastName: "User",
        userName: "user2501",
        gender: "M",
        maritalStatus: "M",
        birthDate: "0000-00-00",
        email: "username1@gmail.com",
        country: "US",
        city: "FL",
        province: null,
        address: null,
        zipCode: null,
        phoneNumber: null,
        countryCode: null,
        lastLogin: null,
        createdAt: "2018-12-11T02:14:20.179Z",
        updatedAt: "2018-12-11T02:14:20.179Z",
        role: {
          publicId: "6a46de14-489a-4944-b57e-218ab5c44ac1",
          roleName: "client",
          createdAt: "2018-12-11T02:02:17.620Z",
          updatedAt: "2018-12-11T02:02:17.620Z"
        }
      }
    });
};

module.exports = {
  getUser: getUser
};
