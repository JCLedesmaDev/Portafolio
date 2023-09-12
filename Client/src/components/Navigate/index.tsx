import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigateModuleCSS from './index.module.css'
import { deleteStorage } from '../../utils/magnamentStorage';
import { useAppStore } from '../../pages/appStore';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'

export const Navigate: React.FC = () => {

  const navigate = useNavigate()
  const appStore = useAppStore()
  const [userAdmin, setUserAdmin] = useState<boolean>(false)

  const closeSesion = () => {
    navigate("/authUser")
    deleteStorage("User")
    deleteStorage("Headers")
  }



  useEffect(() => {
    const isAdmin = appStore.state.user.roles.some(rol => rol.name === 'Admin')
    setUserAdmin(isAdmin)
  }, [])

  if (useLocation().pathname === '/authUser') {
    return <></>
  }

  return (

    <Navbar bg="dark" variant="dark" className={NavigateModuleCSS.containerNavigate}>
      <Container>
        <Navbar.Brand href="">Album Virtual</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
            <NavLink className={
              ({ isActive }) => isActive
                ? `${NavigateModuleCSS.navItem} ${NavigateModuleCSS.isActive}`
                : NavigateModuleCSS.navItem
            } to="/">Albumes</NavLink>
            <NavLink className={
              ({ isActive }) => isActive
                ? `${NavigateModuleCSS.navItem} ${NavigateModuleCSS.isActive}`
                : NavigateModuleCSS.navItem
            } to="/figurites">Figuritas</NavLink>
            <NavDropdown title="Mi cuenta" id="basic-nav-dropdown">
              <div className={NavigateModuleCSS.navDropdown}>
                {
                  userAdmin && <NavLink className={
                    ({ isActive }) => isActive
                      ? `${NavigateModuleCSS.navItemDrop} ${NavigateModuleCSS.isActive}`
                      : NavigateModuleCSS.navItemDrop
                  } to="/administration">Administracion</NavLink>
                }
                <NavLink className={
                  ({ isActive }) => isActive
                    ? `${NavigateModuleCSS.navItemDrop} ${NavigateModuleCSS.isActive}`
                    : NavigateModuleCSS.navItemDrop
                } to="/purchasedAlbumes">Mis albumes comprados</NavLink>
                <NavLink className={
                  ({ isActive }) => isActive
                    ? `${NavigateModuleCSS.navItemDrop} ${NavigateModuleCSS.isActive}`
                    : NavigateModuleCSS.navItemDrop
                } to='/authUser' onClick={closeSesion}> Cerrar sesion </NavLink>
              </div>

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}