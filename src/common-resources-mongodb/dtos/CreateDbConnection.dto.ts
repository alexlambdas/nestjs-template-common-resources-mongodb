export class CreateDbConnectionDto {
    user: string;
    pass: string;
    serverSelectionTimeoutMS: number;
    useUnifiedTopology: boolean;
}