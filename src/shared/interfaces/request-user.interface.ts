import Role from '../../users/roles/role.enum'
export default interface IRequestUser {
    id: string;
    email: string;
    role: Role;
}
