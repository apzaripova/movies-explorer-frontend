function Animations(props) {

    if (props.success) {
      return (
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      );
    } else {
      return (
        <svg className="crossmark addClass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="crossmark__circle addClass" cx="26" cy="26" r="25" fill="none"/>
          <path className="cross__path cross__path--right addClass" fill="none" d="M16,16 l20,20" />
          <path className="cross__path cross__path--left addClass" fill="none" d="M16,36 l20,-20" />
        </svg>
      );
    }
  }
  
  export default Animations;