import Role from '../../users/enums/role.enum'
export default interface IRequestUser {
    id: string;
    email: string;
    role: Role;
}
