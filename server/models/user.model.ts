import {
    Association,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin,
    Model,
} from 'sequelize';
import { sequelize } from './index'; //방금 만들어주었던 sequelize객체 임포트
import { Posts } from './post.model';

// // These are all the attributes in the User model
interface UsersAttributes {
    id: number;
    email: string;
    password: string;
    name: string;
    jwt: string;
    image: string | null;
    age: number;
    gender: number;
    address1: string;
    address2: string;
    level: number;
}

export class Users extends Model<UsersAttributes> {
    public readonly id!: number; //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
    public email!: string;
    public password!: string;
    public name!: string;
    public jwt!: string;
    public image!: string;
    public age!: number;
    public gender!: number;
    public address1!: string;
    public address2!: string;
    public level!: number;

    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getPosts!: HasManyGetAssociationsMixin<Posts>; // Note the null assertions!
    public addPosts!: HasManyAddAssociationMixin<Posts, number>;
    public hasPosts!: HasManyHasAssociationMixin<Posts, number>;
    public countPosts!: HasManyCountAssociationsMixin;
    public createPosts!: HasManyCreateAssociationMixin<Posts>;

    // public readonly posts?: Posts[];

    public static associations: {};
}
//----------------------------
Users.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        jwt: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        age: {
            type: DataTypes.INTEGER(),
            allowNull: true,
        },
        gender: {
            type: DataTypes.TINYINT(),
            allowNull: true,
        },
        address1: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        address2: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        level: {
            type: DataTypes.TINYINT(),
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        modelName: 'users',
        tableName: 'users',
        sequelize,
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
    }
);
//-------
