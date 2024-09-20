import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: () => import("../views/Home.vue")
        },
        {
            path: "/auth",
            children: [
                {
                    path: "login",
                    component: () => import("../views/auth/login.vue")
                },
                {
                    path: "register",
                    component: () => import("../views/auth/register.vue")
                }
            ]
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
                },
                {
                    path: "vote/:origin/:code",
                    component: () => import("../views/vote.vue")
                },
                {
                    path: "remaining/:origin/:code",
                    component: () => import("../views/creator/remainingVoters.vue")
                },
                {
                    path: "reading/:origin/:code",
                    component: () => import("../views/creator/readingVotes.vue")
                },
                {
                    path: "results/:code",
                    component: () => import("../views/creator/ranking.vue")
                },
                {
                    path: "myVotes",
                    component: () => import("../views/creator/myVotes.vue")
                }
            ]
        },
        {
            path: "/join",
            component: () => import("../views/join.vue")
        },
        {
            path: "/vote/:origin/:code",
            component: () => import("../views/vote.vue")
        },
        {
            path: "/thankyou",
            component: () => import("../views/thankYou.vue")
        }
    ]
})

export default router;
