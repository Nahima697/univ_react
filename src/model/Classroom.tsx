export  default interface Classroom {

    id:string,
    name:string,
    capacity:number,
    registerDeadline:Date,
    isTooLate:boolean,
    nbStudents:number,
    isFull:boolean

}