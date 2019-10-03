const getAllRoles = async (req, res) => {
  res.send([
    {
      "publicId": "e56cf456-6b5a-4abc-9865-ae11e9980396",
      "roleName": "admin",
      "createdAt": "2018-12-11T02:17:16.586Z",
      "updatedAt": "2018-12-11T02:17:16.586Z",
      "privileges": [
        {
          "publicId": "4177e280-cb80-4089-9461-0943a16b4414",
          "resourceName": "/home",
          "show": true,
          "create": true,
          "update": false,
          "delete": true,
          "createdAt": "2018-12-11T02:17:16.602Z",
          "updatedAt": "2018-12-11T02:17:16.602Z"
        }
      ]
    },
    {
      "publicId": "e4365560-c9d5-4663-817f-e9e2a250732c",
      "roleName": "client",
      "createdAt": "2018-12-11T15:54:48.088Z",
      "updatedAt": "2018-12-11T15:54:48.088Z",
      "privileges": [
        {
          "publicId": "b98726ab-78d3-4528-80a0-ddf952db382f",
          "resourceName": "/users",
          "show": true,
          "create": true,
          "update": false,
          "delete": true,
          "createdAt": "2018-12-11T15:54:48.124Z",
          "updatedAt": "2018-12-11T15:54:48.124Z"
        }
      ]
    }
  ]);
};

module.exports = {
  getAllRoles: getAllRoles
};
