import { Table, Model, PrimaryKey, AutoIncrement, Column, Default, CreatedAt, UpdatedAt, DataType } from "sequelize-typescript";

@Table
export class Attendant extends Model<Attendant> {
    /** Primary Informations */

    /**
     * Primary ID
     * @desc Not related to Github
     */
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    /**
     * Github id numbers
     */
    @Column
    githubId: string;

    /**
     * Github Username
     */
    @Column
    username: string;

    /**
     * URL of profile picture
     */
    @Default("N/A")
    @Column
    avatar_url: string;

    /**
     * Email address
     * @desc Only primary address set by Github will be stored
     */
    @Column
    email: string;

    /**
     * Company information
     */
    @Default("N/A")
    @Column
    company: string;

    /**
     * Location information
     * @desc Given text by user, not standard form
     */
    @Default("N/A")
    @Column
    location: string;

    /**
     * Is this person looking for the job
     */
    @Default(false)
    @Column
    hireable: boolean;

    /**
     * Bio text
     */
    @Default("N/A")
    @Column({
        type: DataType.TEXT
    })
    bio: string;

    /**
     * Count of public adminable repositories
     */
    @Column
    public_repos: number;

    /**
     * Count of followers
     */
    @Column
    followers: number;

    /**
     * Count of followers
     */
    @Column
    following: number;

    /**
     * Adminable repos
     * @desc Made or forked repositories by this user
     *       JSON string array will be stored perhaps sequelize dosen't support JSON type
     */
    @Default('[]')
    @Column({
        type: DataType.TEXT
    })
    repos_admin: string;

    /**
     * Starred repos
     * @desc Starred repositories by this user
     *       JSON string array will be stored perhaps sequelize dosen't support JSON type
     */
    @Default('[]')
    @Column({
        type: DataType.TEXT
    })
    repos_starred: string;

    /**
     * Ethereum wallet code
     */
    @Default('N/A')
    @Column
    ethWallet: string;

    /** OAuth Related Informations */

    /**
     * oAuth access token
     */
    @Default('N/A')
    @Column
    oAuthAccessToken: string;

    /**
     * Timestamps
     */
    @CreatedAt
    creationDate: Date;
    
    @UpdatedAt
    updatedOn: Date;
}