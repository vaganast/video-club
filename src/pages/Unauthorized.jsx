import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Unauthorized = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/movies');
    }, 1000);
  }, []);

  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
    </section>
  );
};

export default Unauthorized;
