import {createRouter, createWebHistory} from 'vue-router';
import UsersList from './components/UsersList';
import UserShow from './components/UserShow';
import UserForm from './components/UserForm';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'users',
            path: '/',
            component: UsersList,
        },
        {
            name: 'user-form',
            path: '/user/edit/:userId?',
            component: UserForm,
            props: true,
            alias: '/user/add'
        },
        {
            name: 'user-show',
            path: '/user/:userId(\\d+)',
            component: UserShow,
            props: true
        },
    ],
});

export default router;
