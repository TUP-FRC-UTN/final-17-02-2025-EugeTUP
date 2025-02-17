export interface User {
    id: string,
    username: string,
    password: string,
    role: string,
    name: string
}



export interface Score {

    playerName: string,
    word: string,
    attemptsLeft: number,
    score: number,
    date: string,
    idGame: string,
    id: string

}


export interface Word {

    id: string,
    word: string,
    category: string
}


