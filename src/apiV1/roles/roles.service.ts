import { RolesResponseModel } from '../../models/roles/rolesResponseModel';
import Roles from '../roles/roles.model';
import { RolesRequestUpdateData } from '../../models/roles/rolesRequestUpdateData';

export default class RolesService {
    getByUserId = async (id: string): Promise<RolesResponseModel> => {
        const queryRole = await Roles.findOne({userId: id});
        if (queryRole) return queryRole;
    }

    update = async (roleData: RolesRequestUpdateData): Promise<void> => {
        await Roles.updateOne({ userId: roleData.userId }, roleData );
    }
}