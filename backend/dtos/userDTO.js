// In user obj if you want some specific things only need to transfer to front-end(react)
class UserDTO{
    id;
    phone;
    activated;
    createdAt;

    constructor(user){
        this.id = user._id;
        this.phone = user.phone;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
    }
}

module.exports = UserDTO;