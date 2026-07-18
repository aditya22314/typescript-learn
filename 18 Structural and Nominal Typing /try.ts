interface Person {
    name: string
}

interface User {
    name: string
}

const person: Person = {
    name: "Raj"
}


const user: User = {
    name: "King"
}

const person2: Person = user  //Duck typing