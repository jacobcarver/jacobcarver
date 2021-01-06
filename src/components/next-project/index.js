import { Link } from 'react-router-dom';
import { projects, routes } from '../../api';
import styles from './next-project.module.scss';

export default function NextProject({ setIndex, currentPage, history }) {
  const previousProjectIndex = routes.indexOf(currentPage) - 1 >= 0 ? routes.indexOf(currentPage) - 1 : routes.length - 1
  const nextProjectIndex = routes.indexOf(currentPage) + 1 > routes.length - 1 ? 0 : routes.indexOf(currentPage) + 1;
  return (
    <div className={styles.next}>
      <Link className={styles.next__link} onClick={e => {
        e.preventDefault();
        setTimeout(() => {
          window.scrollTo({top: 0});
          setIndex(previousProjectIndex);
        }, 750);
        setTimeout(() => {
          history.push(routes[previousProjectIndex])
        }, 1000)
        }} to={routes[previousProjectIndex]}>
          <h1>Prev</h1>
          <span>({projects[previousProjectIndex].title})</span>
        </Link>
      <Link className={styles.next__link} onClick={e => {
        e.preventDefault();
        setTimeout(() => {
          window.scrollTo({top: 0});
          setIndex(nextProjectIndex);
        }, 750);
        setTimeout(() => {
          history.push(routes[nextProjectIndex])
        }, 1000)
        }} to={routes[nextProjectIndex]}>
          <h1>Next</h1>
          <span>({projects[nextProjectIndex].title})</span>
        </Link>
    </div>
  )
}