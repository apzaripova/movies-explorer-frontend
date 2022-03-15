import React from 'react';
import { Link } from 'react-router-dom';

function NotFound(props) {
  return (
    <section className="not-found">
      <h1 className="not-found__title">{props.title || '404'}</h1>
      <h2 className="not-found__subtitle">{props.subtitle || 'Страница не найдена'}</h2>
      <Link to="/" className="not-found__link">{props.linkText || 'Назад'}</Link>
    </section>
  );
}

export default NotFound;