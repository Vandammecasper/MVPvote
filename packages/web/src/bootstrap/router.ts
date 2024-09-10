import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: () => import("../views/Home.vue")
        },
        {
            path: "/creator",
            children: [
                {
                    path: "create",
                    component: () => import("../views/creator/create.vue")
                },
                {
                    path: "qr/:code",
                    component: () => import("../views/creator/qr.vue")
                }
            ]
        }
    ]
})

export default router;