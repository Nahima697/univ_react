export  default interface Classroom {

    id:string,
    name:string,
    capacity:number,
    registerDeadline:Date,
    description:string,
    isTooLate:boolean,
    nbStudents:number,
    isFull:boolean,
    freespot:number

}