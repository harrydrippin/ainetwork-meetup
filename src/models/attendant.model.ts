import { Table, Model, PrimaryKey, AutoIncrement, Column, Default } from "sequelize-typescript";

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
     * Github Username
     */
    @Column
    username: string;

    /**
     * URL of profile picture
     */
    @Column
    @Default("N/A")
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
    @Column
    @Default("N/A")
    company: string;

    /**
     * Location information
     * @desc Given text by user, not standard form
     */
    @Column
    @Default("N/A")
    location: string;

    /**
     * Is this person looking for the job
     */
    @Column
    @Default(false)
    hireable: boolean;

    /**
     * Bio text
     */
    @Column
    @Default("N/A")
    bio: string;

    /**
     * Count of public adminable repositories
     */
    @Column
    public_repo_count: number;

    /**
     * Count of followers
     */
    @Column
    follower_count: number;

    /**
     * Count of followers
     */
    @Column
    following_count: number;

    /**
     * Adminable repos
     * @desc Made or forked repositories by this user
     *       JSON string array will be stored perhaps sequelize dosen't support JSON type
     */
    @Column
    @Default('[]')
    repos_admin: string;

    /**
     * Starred repos
     * @desc Starred repositories by this user
     *       JSON string array will be stored perhaps sequelize dosen't support JSON type
     */
    @Column
    @Default('[]')
    repos_starred: string;

    /**
     * Ethereum wallet code
     */
    @Column
    @Default('N/A')
    ethWallet: string;

    /** OAuth Related Informations */

    /**
     * oAuth state, which is random string to prevent CSRF attack
     */
    @Column
    @Default('N/A')
    oAuthState: string;

    /**
     * oAuth access token
     */
    @Column
    @Default('N/A')
    oAuthAccessToken: string;

    /**
     * Timestamp for the last access
     */
    @Column
    @Default(-1)
    timestamp: number;
}