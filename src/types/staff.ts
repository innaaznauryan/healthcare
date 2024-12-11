export interface StaffMemberSchema {
    id: number;
    fullName: string;
    position: string;
    isHead: boolean;
    departmentId: number;
}

export type NewStaffMemberSchema = Omit<StaffMemberSchema, 'id' | 'position'>;
