import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch, Redirect, withRouter } from 'react-router-dom';
import { NotFoundPage } from './404page';
import Archives from './archives';
import BlogsContainer from '../redux_container/front_blogs_container';
import BlogPageContainer from '../redux_container/blog_detail_container'
import Loadable from 'react-loadable'
import CategoryManagementContainer from '../redux_container/category_container'
import PublishNewBlogContainer from '../redux_container/admin_blog_container'
import UserManagementContainer from '../redux_container/admin_user_container'
import BlogManagementContainer from '../redux_container/admin_management_container'
import { AdminLogin } from './login';
import LoadingPage from './loading_page'
import Header from './header';
import { Footer } from './footer'
import AboutMe from './about_me';


export class PublicRoute extends Component {
    render() {
        const { component: Component, ...rest } = this.props
        return (
            <Route {...rest} render={props => {
                return (
                    <div>
                        <Header />
                        <Component {...props} />
                        <Footer />
                    </div>)
            }
            } />
        )
    }
}

export class PrivateRoute extends Component {
    render() {
        const { component: Component, ...rest } = this.props
        const admin = JSON.parse(localStorage.getItem("admin"))
        const isLogged = localStorage.getItem("admin") != null ? true : false;
        return (
            <Route {...rest} render={props => {
                return isLogged && admin.type === 1 ? <Component {...props} /> : <Redirect to='/admin/login' />
            }
            } />
        )
    }
}

class ToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }
    render() {
        return this.props.children;
    }
}
const ScrollToTop = withRouter(ToTop);

const FrontBlogs = Loadable({
    loader: () => import('../redux_container/front_blogs_container'),
    loading: LoadingPage,
    delay:300
})

const BlogPage = Loadable({
    loader: () => import('../redux_container/blog_detail_container'),
    loading: LoadingPage,
    delay:300
})

export const Routes = () => (
    <Router>
        <ScrollToTop>
            <Switch>
                <PublicRoute exact path='/' component={FrontBlogs} />
                <PublicRoute path='/blogs' component={FrontBlogs} />
                <PublicRoute path='/blogDetail/:blog_id' component={BlogPage} />
                <PublicRoute path='/archives' component={Archives} />
                <PublicRoute path='/about_me' component={AboutMe} />

                <Route path='/admin/login' component={AdminLogin} />
                <PrivateRoute exact path='/admin' component={BlogManagementContainer} />
                <PrivateRoute path='/admin/blog_management' component={BlogManagementContainer} />
                <PrivateRoute path='/admin/publish_new_blog' component={PublishNewBlogContainer} />
                <PrivateRoute path='/admin/category_management' component={CategoryManagementContainer} />
                <PrivateRoute path='/admin/user_management' component={UserManagementContainer} />

                <Route component={NotFoundPage} />
            </Switch>
        </ScrollToTop>
    </Router>)
