
import { createStore } from 'vuex';
import staff from '../data/staff.json';
import { StaffMemberSchema } from '../types/staff';

interface State {
    staff: StaffMemberSchema[];
}
type MutationKeys = 'createStaffMember' | 'updateStaffMember' | 'deleteStaffMember';
type MutationPayloads = {
    createStaffMember: StaffMemberSchema;
    updateStaffMember: StaffMemberSchema;
    deleteStaffMember: number;
};
type Commit = <K extends MutationKeys>(
    key: K,
    payload: MutationPayloads[K]
) => void;


export const store = createStore({
    state() {
        const storedStaff = localStorage.getItem('staff');
        return {
            staff: storedStaff ? JSON.parse(storedStaff) : staff,
        };
    },
    mutations: {
        createStaffMember(state: State, newStaffMember: StaffMemberSchema) {
            state.staff.push(newStaffMember);
            localStorage.setItem('staff', JSON.stringify(state.staff));
        },
        updateStaffMember(state: State, updatedStaffMember: StaffMemberSchema) {
            state.staff = state.staff.map((staffMember) =>
                staffMember.id === updatedStaffMember.id ? updatedStaffMember : staffMember
            );
            localStorage.setItem('staff', JSON.stringify(state.staff));
        },
        deleteStaffMember(state: State, id: number) {
            state.staff = state.staff.filter((staffMember) => staffMember.id !== id);
            localStorage.setItem('staff', JSON.stringify(state.staff));
        },
    },
    actions: {
        createStaffMember({ commit }: { commit: Commit }, newStaffMember: StaffMemberSchema) {
            commit('createStaffMember', newStaffMember);
        },
        updateStaffMember({ commit }: { commit: Commit }, updatedStaffMember: StaffMemberSchema) {
            commit('updateStaffMember', updatedStaffMember);
        },
        deleteStaffMember({ commit }: { commit: Commit }, id: number) {
            commit('deleteStaffMember', id);
        },
    },
});
