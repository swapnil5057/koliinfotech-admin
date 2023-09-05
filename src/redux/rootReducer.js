import { combineReducers } from "redux";
import usersReducer from "./Reducers/reducer";
import OurServicesReducer from "./Reducers/OurServicesReducer";
import OurProductsReducer from "./Reducers/OurProductsReducer";
import OurClientsReducer from "./Reducers/OurClientsReducer";
import OurTopBlogsReducer from "./Reducers/OurTopBlogsReducer";
import OurEmployeesReducer from "./Reducers/OurEmployeesReducer";
import OurOpeningsReducer from "./Reducers/OurOpeningsReducer";
import ContactUsReducer from "./Reducers/ContactUsReducer";
import AppliedForJobReducer from "./Reducers/AppliedForJobReducer";
import ForgotPassReducer from "./Reducers/ForgotPassReducer";

const rootReducer = combineReducers({
    userDetails: usersReducer,
    serviceData: OurServicesReducer,
    productsDetail: OurProductsReducer,
    clientDetail: OurClientsReducer,
    blogsDetail: OurTopBlogsReducer,
    employeesDetail: OurEmployeesReducer,
    openingDetail: OurOpeningsReducer,
    contactDetail: ContactUsReducer,
    AppliedForJobDetail: AppliedForJobReducer,
    forgotPassDetail:ForgotPassReducer,
})

export default rootReducer;
