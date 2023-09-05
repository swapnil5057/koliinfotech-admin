import { all } from "redux-saga/effects";
import userSaga from "./usersagas";
import ourServicessaga from "./ourServicessagas";
import ourProductssaga from "./ourProductssagas";
import OurClientsSaga from "./OurClietssagas";
import OurTopBlogsaga from "./OurTopBlogssagas";
import OurEmployeessaga from "./OurEmployeessagas";
import OurOpeningssaga from "./OurOpeningssagas";
import ContactUssaga from "./ContactUssagas";
import AppliedForJobsaga from "./AppliedForJobsagas";
import ForgotPassSaga from "./ForgotPasssagas";

export default function* rootSaga() {
    yield all([
        userSaga(),
        ourServicessaga(),
        ourProductssaga(),
        OurClientsSaga(),
        OurTopBlogsaga(),
        OurEmployeessaga(),
        OurOpeningssaga(),
        ContactUssaga(),
        AppliedForJobsaga(),
        ForgotPassSaga(),
    ]);
}
