import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index'; //방금 만들어주었던 sequelize객체 임포트

// // These are all the attributes in the User model
interface UsersAttributes {
    email: string;
    password: string;
    name: string;
    jwt: string;
    level: number;
}

export class Users extends Model<UsersAttributes> {
    public readonly id!: number; //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
    public email!: string;
    public password!: string;
    public name!: string;
    public jwt!: string;
    public level!: number;

    public static associations: {};
}
//----------------------------
Users.init(
    {
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
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
            allowNull: false,
        },
        level: {
            type: DataTypes.TINYINT(),
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        modelName: 'users',
        tableName: 'users',
        sequelize,
        freezeTableName: true,
        timestamps: false,
    }
);
