function Profile(props) {
    return (
      <section className="profile">
        <h2 className="profile__greeting">Привет, {props.name || 'USERNAME'}!</h2>
        <div className="profile__data-container">
          <p className="profile__text">Имя</p>
          <p className="profile__text">{props.name || 'USERNAME'}</p>
        </div>
        <div className="profile__data-container">
          <p className="profile__text">Email</p>
          <p className="profile__text">{props.email || 'EMAIL'}</p>
        </div>
        <button type="button" className="profile__button">Редактировать</button>
        <button type="button" className="profile__button profile__button_type_signout">Выйти из аккаунта</button>
      </section>
    );
  }
  
  export default Profile;