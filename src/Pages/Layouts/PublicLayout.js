import { Link } from 'react-router-dom';
import Navbar from '../../Blocks/Navbar'

const PublicLayout = ({ children }) => (
  <div>
    <header>
   
    </header>
    <main>{children}</main>
  </div>
);

export default PublicLayout;