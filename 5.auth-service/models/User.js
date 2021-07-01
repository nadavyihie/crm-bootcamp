function User(userName,fullName,companyName,phoneNumber,email,managerId){
    const userDetails={userName:userName,fullName:fullName,companyName:companyName,phoneNumber:phoneNumber,email:email,managerId:managerId};
    

    return userDetails;
}


module.exports = User;