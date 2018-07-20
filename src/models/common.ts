export class Repository {
    public name: string;
    public commits: number;
    public primary_language: string;

    public constructor(name: string, commits: number, primary_language: string) {
        this.name = name;
        this.commits = commits;
        this.primary_language = primary_language;
    }

    public toObject(): object {
        return {
            name: this.name,
            commits: this.commits,
            primary_language: this.primary_language
        }
    }

    public toString(): string {
        return JSON.stringify(this.toObject());
    }
}