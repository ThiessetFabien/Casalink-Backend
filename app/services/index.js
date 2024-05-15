import debug from "debug";
import userDataMapper from "../datamappers/user";

const casalinkData = {
    async findAllMember() {
        const membersList = await userDataMapper.findAllUsers();
        debug("casalinkData:findAllMember")("membersList", membersList);
        return membersList;
    },
    async findOneMember(id) {
        const membersID = await userDataMapper.findUserById(id);
        debug("casalinkData:find")("membersID", membersID);
        return membersID;
    }
};

export default casalinkData;