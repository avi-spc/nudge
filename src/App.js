import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'nprogress/nprogress.css';

import store from './reduxStore/store';
import { retrieveUser } from './reduxStore/actions/auth';

import Loader from './components/Loader';
import Alert from './components/Alert';
import LogIn from './components/logIn/LogIn';
import SignUp from './components/signUp/SignUp';
import PostFeed from './components/post/feed/PostFeed';
import UserProfile from './components/profile/dashboard/UserProfile';
import Follows from './components/profile/dashboard/Follows';
import UpdateProfile from './components/profile/UpdateProfile';
import IndividualPost from './components/post/individualPost/IndividualPost';
import ImageUpload from './components/post/createPost/ImageUpload';
import PublishPost from './components/post/createPost/PublishPost';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
	useEffect(() => {
		store.dispatch(retrieveUser());
	}, []);

	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Loader />
					<Alert />
					<Routes>
						<Route path="/" element={<LogIn />} />
						<Route path="/register" element={<SignUp />} />
						<Route path="/" element={<PrivateRoute />}>
							<Route path="feed" element={<PostFeed />} />
							<Route path="profile/:user_id/" element={<UserProfile />}>
								{['followers', 'following'].map((path, index) => {
									return <Route path={path} element={<Follows />} key={index} />;
								})}
							</Route>
							<Route path="profile/edit" element={<UpdateProfile />} />
							<Route path="post/:post_id" element={<IndividualPost />} />
							<Route path="create" element={<ImageUpload />} />
							<Route path="create/publish" element={<PublishPost />} />
						</Route>
					</Routes>
				</Router>
			</Provider>
		</div>
	);
};

export default App;
