export interface jobType{
    id: number,
    title: string,
    description: string,
    company:string,
    companyImg: string,
    stipend: number,
    location: string,
    jobType:string,
    contact: string,
    companyName: string,
    url: string,
    createdAt: Date,
    postedBy?: string
}

