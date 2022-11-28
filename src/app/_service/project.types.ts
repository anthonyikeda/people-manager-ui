export type Project = {
    project_id: number;
    project_name: string;
    project_code: string;
    project_location: Location;
    project_start_date: Date;
};

export type Location = {
    market: string;
    city: string;
};