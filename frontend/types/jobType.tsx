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
    employementType:string,
    url: string,
    createdAt: Date,
    postedBy?: string
}


export interface filteredValue {
    jobType: string;
    location: string;
    employementType:string;
  }