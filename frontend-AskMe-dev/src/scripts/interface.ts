export interface IUserData {
    _id?: string
    email: string,
    password?: string,
    name?: string,
    username?: string,
    job?: string
}



export interface IAddResponse {
    acknowledged?: boolean,
    insertedId?: string
}

export interface ILoginResponse {
    userData: IUserData,
    token: string
}

export interface IGroupData {
    name: string,
    members?: string[],
    admin: string,
    description: string,
    createdAt: string
}

export interface IThread {
    _id?: string,
    question: string,
    answers: IAnswers[],
    group: string,
    questionByUser: string,
    date: string,
    
}

export interface IAnswers {
    id: string,
    username: string,
    answer: string
    answeredDate: string
    upvote: number,
    downvote: number,
    voteClicked: boolean
}
