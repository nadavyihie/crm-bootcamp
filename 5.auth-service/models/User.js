function User(userName,fullName,phoneNumber,email){
    this.userName = userName;
    this.fullName=fullName;
    this.phoneNumber=phoneNumber;
    this.email=email;


    return this;
}


module.exports = User;