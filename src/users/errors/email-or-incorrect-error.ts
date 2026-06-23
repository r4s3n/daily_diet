export class EmailOrIncorrect extends Error{
    constructor(){
        super('Email or password incorrect')
    }
}