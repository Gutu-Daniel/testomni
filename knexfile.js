module.exports = {
	local: {
		client: "mysql2",
		connection: {
			host: "localhost",
			user: "root",
			password: "",
			database: "omni",
		}
	},
	development: {
		client: "mysql2",
		connection: {
			// host: "us-cdbr-east-06.cleardb.net",
			// user: "bf755aedec1c67",
			// password: "79e8e86d",
			// database: "heroku_113b5a65dbb982f",

			// host: "localhost",
			// user: "root",
			// password: "",
			// database: "omnitogether-social-media",

			host: "3.210.250.91",
			user: "josh",
			password: "Godlover00*!",
			database: "omni",
			// ALTER USER 'josh'@'localhost' IDENTIFIED BY 'Godlover00*!1234.';
		}
	},
	production: {
		client: "mysql2",
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME
		}
	}
}