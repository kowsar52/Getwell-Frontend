import Vue from "vue";
import VueRouter from "vue-router";


import LoadingComponent from "./LoadingComponent.vue";
import ErrorComponent from "./ErrorComponent.vue";
import $ from 'jquery'

const lazyLoadView = ({ component, loading, error }) => {
  const AsyncHandler = () => ({
    component,
    loading,
    error
  });

  return () =>
    Promise.resolve({
      functional: true,
      render(h, { data, children }) {
        return h(AsyncHandler, data, children);
      }
    });
};




//
//backend component
//
const Signup = lazyLoadView({
  component: import(/* webpackChunkName: "Signup" */ "../views/auth/Signup.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});
const AccountConfirmation = lazyLoadView({
  component: import(/* webpackChunkName: "AccountConfirmation" */ "../views/auth/AccountConfirmation.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});
const VerifyAccount = lazyLoadView({
  component: import(/* webpackChunkName: "VerifyAccount" */ "../views/auth/VerifyAccount.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});

const Login = lazyLoadView({
  component: import(/* webpackChunkName: "Login" */ "../views/auth/Login.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});

const ForgotPassword = lazyLoadView({
  component: import(/* webpackChunkName: "ForgotPassword" */ "../views/auth/ForgotPassword.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});

const ResetPassword = lazyLoadView({
  component: import(/* webpackChunkName: "ResetPassword" */ "../views/auth/ResetPassword.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});

const Home = lazyLoadView({
  component: import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});

const Profile = lazyLoadView({
  component: import(/* webpackChunkName: "Profile" */ "../views/user/Profile.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});
const Dashboard = lazyLoadView({
  component: import(/* webpackChunkName: "dashboard" */ "../views/user/Dashboard.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});
const AppointmentTime = lazyLoadView({
  component: import(/* webpackChunkName: "AppointmentTime" */ "../views/user/doctor/AppointmentTime.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});
const CreateAppointment = lazyLoadView({
  component: import(/* webpackChunkName: "CreateAppointment" */ "../views/user/doctor/CreateAppointment.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});
const BookAppointment = lazyLoadView({
  component: import(/* webpackChunkName: "BookAppointment" */ "../views/user/BookAppointment.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});
const MyBookings = lazyLoadView({
  component: import(/* webpackChunkName: "MyBookings" */ "../views/user/MyBookings.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});
const Patients = lazyLoadView({
  component: import(/* webpackChunkName: "Patients" */ "../views/user/doctor/Patients.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});
const Prescriptions = lazyLoadView({
  component: import(/* webpackChunkName: "Prescriptions" */ "../views/user/doctor/Prescriptions.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});
const PrescriptionView = lazyLoadView({
  component: import(/* webpackChunkName: "PrescriptionView" */ "../views/user/doctor/PrescriptionView.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});

const MessageBox = lazyLoadView({
  component: import(/* webpackChunkName: "MessageBox" */ "../views/user/inbox/MessageBox.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});
const Inbox = lazyLoadView({
  component: import(/* webpackChunkName: "Inbox" */ "../views/user/inbox/Inbox.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});

const Pages = lazyLoadView({
  component: import(/* webpackChunkName: "Pages" */ "../views/Pages.vue"),
  loading: LoadingComponent,
  error: ErrorComponent
});



Vue.use(VueRouter);

const routes = [
  // fronend route  start
  { 
    path: '*', 
    component:()=> import(/* webpackChunkName: "404" */ "../views/404.vue"),
    meta: {
      title: "Page Not Found • GetWell",
      role: 'all'
    },
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Home • GetWell",
      auth: false,
      role: 'all'
    },
  },
 // fronend route  end
 
  //backend route
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login • GetWell",
      auth: false,
      role: 'all'
    },
  },
  {
    path: "/register",
    name: "register",
    component: Signup,
    meta: {
      title: "Signup • GetWell",
      auth: false,
      role: 'all'
    },
  },
  {
    path: "/register/confirm/:email",
    name: "confirm_account",
    component: AccountConfirmation,
    meta: {
      title: "Account Confirmation",
      auth: false,
      role: 'all'
    },
  },
  {
    path: "/forgot-password",
    name: "forgot_password",
    component: ForgotPassword,
    meta: {
      title: "Forogt Password • GetWell",
      auth: false,
      role: 'all'
    },
  },
  {
    path: "/reset-password/:token",
    name: "reset_password",
    component: ResetPassword,
    meta: {
      title: "Reset Password • GetWell",
      auth: false,
      role: 'all'
    },
  },
  {
    path: "/verify-account/:token",
    name: "verify_account",
    component: VerifyAccount,
    meta: {
      title: "Email Verification • GetWell",
      auth: false,
      role: 'all'
    },
  },
  {
    path: "/terms-condition",
    name: "terms_condition",
    component: Signup,
    meta: {
      title: "Forogt Password • GetWell",
      auth: false,
      role: 'all'
    },
  },

  //authentic route
  {
    path: "/user/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard • GetWell",
      auth: true,
      role: 'all'
    },
  },
  {
    path: "/user/profile",
    name: "profile",
    component: Profile,
    meta: {
      title: "Profile • GetWell",
      auth: true,
      role: 'all'
    },
  },
  //doctor routes
  {
    path: "/user/appointment-time",
    name: "appointment-time",
    component: AppointmentTime,
    meta: {
      title: "Appointment Time • GetWell",
      auth: true,
      role: 'Doctor'
    },
  },
  {
    path: "/user/create-appointment",
    name: "appointment-time",
    component: CreateAppointment,
    meta: {
      title: "Create Appointment • GetWell",
      auth: true,
      role: 'Doctor'
    },
  },
  {
    path: "/user/appointment-time/:id",
    name: "edit-appointment-time",
    component: CreateAppointment,
    meta: {
      title: "Create Appointment • GetWell",
      auth: true,
      role: 'Doctor'
    },
  },
  {
    path: "/user/patients",
    name: "patients",
    component: Patients,
    meta: {
      title: "Patients • GetWell",
      auth: true,
      role: 'Doctor'
    },
  },
  {
    path: "/user/prescriptions",
    name: "prescriptions",
    component: Prescriptions,
    meta: {
      title: "Prescriptions • GetWell",
      auth: true,
      role: 'all'
    },
  },
  {
    path: "/user/prescription/:id",
    name: "prescriptionc-view",
    component: PrescriptionView,
    meta: {
      title: "Prescription View • GetWell",
      auth: true,
      role: 'all'
    },
  },

  //patient route
  {
    path: "/user/book-appoinment/:id",
    name: "book-appointment",
    component: BookAppointment,
    meta: {
      title: "Book Appointment• GetWell",
      auth: true,
      role: 'Patient'
    },
  },
  {
    path: "/user/my-booking",
    name: "my-appointment",
    component: MyBookings,
    meta: {
      title: "My Appointment• GetWell",
      auth: true,
      role: 'Patient'
    },
  },
  {
    path: "/user/inbox",
    name: "inbox",
    component: Inbox,
    meta: {
      title: "Inbox • GetWell",
      auth: true,
      role: 'all'
    },
  },
  {
    path: "/user/inbox/:id",
    name: "inbox",
    component: MessageBox,
    meta: {
      title: "Inbox • GetWell",
      auth: true,
      role: 'all'
    },
  },

  {
    path: "/:slug",
    name: "pages",
    component: Pages,
    meta: {
      title: "Pages • Getwell",
      auth: false,
      role: 'all'
    },
  },

];

const router = new VueRouter({
  linkActiveClass: "active",
  base: '/',
  mode: "history",
  routes
});


router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  $("body").removeClass("xp-toggle-menu"); 
  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    next('/login')
    return
  }
  next()
})



export default router