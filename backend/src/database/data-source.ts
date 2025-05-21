import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../entities/user.entity';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'shania_english_db',
    entities: [User],
    migrations: ['dist/migrations/*.js'],
    synchronize: false, // 마이그레이션을 위해 false로 설정
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource; 