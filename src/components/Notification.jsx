import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return <h3 style={style}>{notification}</h3>;
};

export default Notification;

