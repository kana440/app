module.exports = {
    type: 'mariadb',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME,
    entities: ['dist/**/*.entity.{js,ts}'],
    migrations: ['dist/migrations/*.{js,ts}'],
    seeds: ['dist/migrations/seeders/*.seed.{js,ts}'],
    factories: ['dist/migrations/factories/*.factory.{js,ts}'],
    cli: {
      migrationsDir: 'dist/migrations',
      entitiesDir: 'dist/entities',
      seedersDir: 'dist/migrations/seeds',
      factoriesDir: 'dist/migrations/factories',
    },
    synchronize: false,
  };