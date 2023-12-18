import { Outlet, useNavigation } from "react-router-dom"
import css from './MainLayout.module.css'
import { Header } from './components/header'
import { Sidebar } from './components/sidebar'

export const MainLayout: React.FC = () => {

    const navigation = useNavigation()

    return (
        <main className={css.mainContainer}>

            <div className={css.header}>
                <Header />
            </div>

            <div className={css.sidebar}>
                <Sidebar />
            </div>

            <div className={css.content}>
                {/* Gracais al Outlet aqui se plasmaran todos los childrens de router/index.tsx */}
                <Outlet />
            </div>

            {/*

                <div id="content">

                    // HEADER
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <button type="button" id="sidebarCollapse" className="btn btn-info">
                                <i className="fas fa-align-left"></i>
                                <span>Toggle Sidebar</span>
                            </button>

                            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" id="dropDownNav" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fas fa-align-justify"></i>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="nav navbar-nav ml-auto">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/login">Login</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/signup">Signup</a>
                                    </li>
                                </ul>
                            </div>

                            <ul className="nav navbar-nav mx-auto" id="loggedInCheck">
                                <div className="row">

                                    <li className="nav-item">
                                        <a className="nav-link" href="/logout"></a>
                                    </li>
                                </div>
                            </ul>

                        </div>
                    </nav>

                    // CONTENT
                    <div className="container text-center">
                        <h1>Quick Access</h1>
                        <div className="row">
                            <div className="col-md-6 col-sm-12  mt-3">
                                <a href="/newOrder">
                                    <div className="card paper-raise">
                                        <i className="fas fa-industry fa-6x mt-1"></i>
                                        <div className="card-body">
                                            <h5 className="card-title">Incoming Order</h5>
                                            <p className="card-text">Use this screen to enter info about all the incoming dunnage or cardboard parts</p>

                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-6 col-sm-12  mt-3">
                                <a href="/cardboardStaging">
                                    <div className="card paper-raise">
                                        <i className="fas fa-tools fa-6x mt-1"></i>
                                        <div className="card-body">
                                            <h5 className="card-title">Cardboard Staging</h5>
                                            <p className="card-text">Use this screen to create cardboard or dunnage assemblies</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-sm-12  mt-3">
                                <a href="/qc">
                                    <div className="card paper-raise">
                                        <i className="fas fa-user-check fa-6x mt-1"></i>
                                        <div className="card-body">
                                            <h5 className="card-title">Quality Check</h5>
                                            <p className="card-text">Use this screen for quality check and printing or reprinting labels</p>
                                        </div>
                                    </div>

                                </a>

                            </div>
                            <div className="col-md-6 col-sm-12  mt-3">
                                <a href="/shipping">
                                    <div className="card paper-raise">
                                        <i className="fas  fa-truck-loading fa-6x mt-1"></i>
                                        <div className="card-body">
                                            <h5 className="card-title">Shipping</h5>
                                            <p className="card-text">Use this screen for outgoing shipping orders</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                        </div>
                    </div>


                </div>
            </div>*/}

        </main >
    )
}

