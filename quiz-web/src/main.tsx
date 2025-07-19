import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import Layout from "./layouts/dashboard";
import DashboardPage from "./pages";
import SignInPage from "./pages/signin";
import QuestionCrudPage from "./pages/question";
import QuizPage from "./pages/quiz";
import QuizConfigForm from "./pages/quizconfig";

const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: "/",
                Component: Layout,
                children: [
                    {
                        path: "",
                        Component: DashboardPage,
                    },
                    {
                        path: "question/:id?/*",
                        Component: QuestionCrudPage,
                    },
                    {
                        path: "quiz/start",
                        Component: QuizPage,
                    },
                    {
                        path: "quiz",
                        Component: QuizConfigForm,
                    },
                ],
            },
            {
                path: "/sign-in",
                Component: SignInPage,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
