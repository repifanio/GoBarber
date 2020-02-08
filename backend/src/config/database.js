module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'postgres',
  password: 'docker',
  database: 'goBarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
