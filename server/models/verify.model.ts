import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index'; //방금 만들어주었던 sequelize객체 임포트

// // These are all the attributes in the User model
interface VerifiesAttributes {
    email: string;
    status: string;
    code: string;
}

export class Verifies extends Model<VerifiesAttributes> {
    public readonly id!: number; //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
    public email!: string;
    public verify_flag!: string;
    public code!: string;
    public static associations: {};
}
//----------------------------
Verifies.init(
    {
        email: { type: DataTypes.STRING(100), allowNull: false },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: '',
        },
        code: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
    },
    {
        modelName: 'verifies',
        tableName: 'verifies',
        sequelize,
        freezeTableName: true,
        timestamps: false,
    }
);
