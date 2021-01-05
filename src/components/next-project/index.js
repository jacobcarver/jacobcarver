import { Link } from 'react-router-dom';
import { routes } from '../../api';
import styles from './next-project.module.scss';

export default function NextProject({ setIndex, currentPage, history }) {
  const nextProjectIndex = routes.indexOf(currentPage) + 1 > routes.length - 1 ? 0 : routes.indexOf(currentPage) + 1;
  return (
    <Link className={styles.next} onClick={e => {
      e.preventDefault();
      setTimeout(() => {
        window.scrollTo({top: 0});
        setIndex(nextProjectIndex);
      }, 750);
      setTimeout(() => {
        history.push(routes[nextProjectIndex])
      }, 1000)
      }} to={routes[nextProjectIndex]}>Next Project</Link>
  )
}