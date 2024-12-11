import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";

const HomeView = () => import('../views/HomeView.vue');
const DoctorsView = () => import('../views/DoctorsView.vue');
const NursesView = () => import('../views/NursesView.vue');
const CardiologyView = () => import('../views/CardiologyView.vue');
const SurgicalView = () => import('../views/SurgicalView.vue');

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { title: 'Healthcare Facilities' }
    },
    {
        path: '/doctor',
        name: 'doctor',
        component: DoctorsView,
        meta: { title: 'Doctors' }
    },
    {
        path: '/nurse',
        name: 'nurse',
        component: NursesView,
        meta: { title: 'Nurses' }
    },
    {
        path: '/cardiology',
        name: 'cardiology',
        component: CardiologyView,
        meta: { title: 'Cardiology' }
    },
    {
        path: '/surgical',
        name: 'surgical',
        component: SurgicalView,
        meta: { title: 'Surgical' }
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach(async (to, _) => {
    await nextTick(() => {
        const title = to.meta?.title as string | undefined;
        document.title = title || 'Healthcare Facilities';
    });
});