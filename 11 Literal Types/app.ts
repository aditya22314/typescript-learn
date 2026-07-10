type availableFruit = "Apple" | "Orange" | "Mango" | "Grapes"
let fruits: availableFruit = "Apple"

let myFruit: availableFruit = "Orange"

//Template literal types 
type endpoints = `/api/${"user" | "posts" | "comments"}`

let api: endpoints = "/api/user"