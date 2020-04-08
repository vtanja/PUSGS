export class User {
     firstName:string;
     lastName:string;
     email:string;
     username:string;
     password:string;
     phoneNumber:string;
     address:string;
     friends:User[];

    constructor(firstName:string, lastName:string,
          email:string, username:string, password:string, phone:string, address:string, friends:User[] ){
            this.firstName=firstName;
            this.lastName=lastName;
            this.email=email;
            this.username=username;
            this.password=password;
            this.phoneNumber=phone;
            this.address=address;
            this.friends=friends;
         }
}
