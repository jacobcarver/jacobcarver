import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../api';
import styles from './project-preview.module.scss';

export default function ProjectPreview({ activeProjectIndex, setIndex, history }) {
  const [index, updateIndex] = useState(activeProjectIndex);
  const [position, setPosition] = useState('fixed');
  let isProjectPage = history.location.pathname.match(/project/g);

  useEffect(() => {
    setTimeout(()=> {
      updateIndex(activeProjectIndex);
    }, 600);
  }, [activeProjectIndex]);

  useEffect(() => {
    if (history.location.pathname === '/') {
      setPosition('fixed');
    } else {
      setPosition('absolute');
    }
  }, [history.location.pathname]);

  return (
    <div className={styles.preview} style={{ position: position }}>
      <div className={styles.preview__container}>
        {projects.map((project, i) => {
          return (
            <Link onClick={e => isProjectPage && e.preventDefault()} to={project.link_local} key={project.link_local} className={styles.preview__container__link} style={{
              right: i === activeProjectIndex || index === i ? '0' : '-100%',
              zIndex: i === activeProjectIndex ? '10' : '0'
            }}>
              <div className={styles.preview__container__link__image} 
              style={{
                backgroundImage: `url('${project.images[0]}')`,
                backgroundColor: project.placeholderColor
              }} />
              <h1 className={styles.preview__container__link__title} >{project.title}</h1>
            </Link>
          )
        })}
      </div>
    </div>
  )
}