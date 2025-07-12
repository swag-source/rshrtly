export interface DB_Row {
    long_url : string;
    url_hash : string;
    created_at : string;
    times_clicked : number;
    expiration_date ? : string;
}
