export class NotAuthorizedFound extends Error{
    constructor(){
        super('You are not authorized to edit this meal')
    }
}