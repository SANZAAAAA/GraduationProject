import Center from "@/views/center/Center.vue";
import NotFound from "@/views/NotFound.vue";
import SurveyAdd from "@/views/survey_manage/SurveyAdd.vue";
import SurveyList from "@/views/survey_manage/SurveyList.vue";
import UserAdd from "@/views/user_manage/UserAdd.vue";
import UserList from "@/views/user_manage/UserList.vue";
import Survey from "@/views/surveys/Survey.vue";
import Summary from "@/views/surveys/Summary.vue";
import Home from "@/views/home/Home.vue";

const routes = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        component: Home
    },
    {
        path: "/center",
        component: Center
    },
    {
        path: "/user-manage/adduser",
        component: UserAdd
    },
    {
        path: "/user-manage/userlist",
        component: UserList
    },
    {
        path: "/survey-manage/addsurvey",
        component: SurveyAdd
    },
    {
        path: "/survey-manage/surveylist",
        component: SurveyList
    },
    {
        path: "/surveys/dosurvey",
        component: Survey
    },
    {
        path: "/surveys/summary",
        component: Summary
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound
    }
]

export default routes