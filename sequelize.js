const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

// clever cloud credentials connection

const sequelize = new Sequelize("bvq1qrn848bjhcdjgnc4", "uzbh8uv1o5w1ds3c", "wwrOpfWmZzJZp49l9fpH", {
  dialect: "mysql",
  host: "bvq1qrn848bjhcdjgnc4-mysql.services.clever-cloud.com",
  pool: {
    max: 5,
    min: 0,
    idle: 5000
  }
});

// database model

const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull:false,
      validate: {
        notNull: true,
        len: [3,10]
      }
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull:false,
        validate: {
          notNull: true,
          len: [3,10]
        }
    },
    email: {
      type: Sequelize.STRING,
      allowNull:false,
      validate: {
        isEmail: true, 
        notNull: true
      }
    },
    password: {
        type: Sequelize.STRING,
        allowNull:false,
        validate: {
            notNull: true,
            len: [8,20]
        }
    }
}, {
    timestamps: false,
    // paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'user'
});

// database queries

async function getter()
{
  sequelize.sync().then(async() => {
    var result = await User.findAll({raw: true});
    console.log(result)
  })
}

// getter()

async function setter(data)
{
  sequelize.sync().then(async() => {
    var result = await User.create(data)
    console.log(result.dataValues)
  })
}

// setter({ firstname: "Bilal", lastname: "Ahmad", email: "billy@gmail.com", password: 12345678 });

async function deleter(id)
{
  sequelize.sync().then(async() => {
    var result = await User.destroy({ where: { id: id } })
    console.log(result)
  })
}

// deleter(7)

async function updater(id, data)
{
  sequelize.sync().then(async() => {
    var result = await User.update(data, { where: { id: id } })
    console.log(result)
  })
}

// updater(5, { firstname: "Billy", lastname: "Pentester", email: "paki@gmail.com" })
