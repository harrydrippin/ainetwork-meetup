import { Table, Model, PrimaryKey, Column, Default, CreatedAt, UpdatedAt, DataType } from "sequelize-typescript";

@Table
export class Attendant extends Model<Attendant> {
    /** Primary Informations */

    /**
     * Primary ID, with Github index
     */
    @PrimaryKey
    @Column
    id: string;

    /**
     * Github Username
     */
    @Column
    username: string;

    /**
     * Name
     */
    @Column
    name: string;

    /**
     * Phone number
     */
    @Column
    phone: string;

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

    /**
     * Flag that indicates email sent was done
     */
    @Default(false)
    @Column
    emailSent: boolean;

    /**
     * Timestamps
     */
    @CreatedAt
    creationDate: Date;
    
    @UpdatedAt
    updatedOn: Date;
}