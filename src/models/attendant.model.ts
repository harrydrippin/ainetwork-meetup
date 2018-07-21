import { Table, Model, PrimaryKey, AutoIncrement, Column } from "sequelize-typescript";

@Table
export class Attendant extends Model<Attendant> {
    /**
     * Primary Informations
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
    profile_pic_url: string;

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
    company: string;

    /**
     * Location information
     * @desc Given text by user, not standard form
     */
    @Column
    location: string;

    /**
     * Is this person looking for the job
     */
    @Column
    is_hiring: boolean;

    /**
     * Bio text
     */
    @Column
    bio: string;

    /**
     * Count of public adminable repositories
     */
    @Column
    public_repo_count: string;

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
     *       JSON string with Repository interface will be stored
     */
    @Column
    repos_admin: string[];

    /**
     * Starred repos
     * @desc Starred repositories by this user
     *       JSON string with Repository interface will be stored
     */
    @Column
    repos_starred: string[];

    /**
     * Ethereum wallet code
     */
    @Column
    ethWallet: string;

    /**
     * OAuth Related Informations
     */

     /**
      * oAuth state, which is random string to prevent CSRF attack
      */
    @Column
    oAuthState: string;

    /**
     * oAuth access token
     */
    @Column
    oAuthAccessToken: string;

}