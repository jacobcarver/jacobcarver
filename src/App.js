import { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { projects, routes } from './api';

// Pages
import About from './pages/about';
import Blog from './pages/blog';
import Project from './pages/project';
import Error from './pages/error';

// Components
import Loader from './components/loader';
import Nav from './components/nav';
import ProgressCircle from './components/progress-circle';
import ProjectPreview from './components/project-preview';
import ProjectCounter from './components/project-counter';
import ProjectToggler from './components/project-toggler';
import SeeMore from './components/see-more';
import Background from './components/background';
import SEO from './components/seo';

const App = ({ history }) => {
  const [activeProjectIndex, setIndex] = useState(routes.indexOf(window.location.pathname) >= 0 ? routes.indexOf(window.location.pathname) : 0);
  const [loading, setLoading] = useState(true)
  let path = window.location.pathname;
  let isProjectPage = path.match(/project/g) || path.length === 1;
  let show;
  if (isProjectPage || isProjectPage.length > 0) {
		show = true;
  }
  if (!routes.includes(path) && isProjectPage.length === 1) {
    show = false;
  }

  useState(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    (history !== undefined) ? 
    <>
      <Loader loading={loading} />

      <Nav setIndex={setIndex} history={history} />
      <ProgressCircle activeProjectIndex={activeProjectIndex} setIndex={setIndex} history={history} />
      <Background />

      {show && (
        <>
          <ProjectPreview activeProjectIndex={activeProjectIndex} setIndex={setIndex} history={history} />
          <ProjectCounter activeProjectIndex={activeProjectIndex} history={history} />
          <ProjectToggler activeProjectIndex={activeProjectIndex} setIndex={setIndex} history={history} />
          <SeeMore activeProjectIndex={activeProjectIndex} href={projects[activeProjectIndex].link_local} link={window.location.pathname === '/'} loading={loading} history={history} />
        </>
      )}

      {/* Setup Page Routes */}
      <Switch>
        <Route path="/" render={() => <><SEO title="Jacob Carver" /></>} exact />
        <Route path="/about" component={About} exact />
        <Route path="/blog" component={Blog} exact />
        {projects.map((project, i) => {
          return (
            <Route key={project.link_local} path={project.link_local} render={() => <Project project={project} i={i} history={history} setIndex={setIndex} />} exact />
          )
        })}
        <Route path="/" component={Error} />
      </Switch>
    </>
    :
    <Error />
  )
}

export default withRouter(App);