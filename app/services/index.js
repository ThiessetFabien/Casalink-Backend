import debug from "debug";
import userDataMapper from "../datamappers";

const casalinkData = {
    async findAllUser() {
        const usersList = await userDataMapper.findAllUsers();
        debug("casalinkData:findAlluser")("usersList", usersList);
        return usersList;
    },
    async findOneUser(id) {
        const usersID = await userDataMapper.findUserById(id);
        debug("casalinkData:find")("usersID", usersID);
        return usersID;
    }
};

export default casalinkData;