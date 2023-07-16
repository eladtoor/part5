import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  // const style = {
  //   border: 'solid',
  //   padding: 10,
  //   borderWidth: 1,
  // };

  return (
    <div className="container">
      {notification && <Alert variant="success">{notification}</Alert>}
    </div>
  );
};

export default Notification;

