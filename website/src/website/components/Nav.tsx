import * as React from "react";
import { home, playground, docs, monarch, switchRoute } from "../pages/routes";
import { Container, Navbar, Nav, NavDropdown } from "./bootstrap";

export class PageNav extends React.Component {
	render() {
		return (
			<Navbar bg="dark" variant="dark" expand="lg">
				<Container fluid>
					<Navbar.Brand href="./switch.html">
						<span className="code-oss-icon d-inline-block align-top" />
						Switch Up
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav" role="">
						<Nav className="me-auto">
							<Nav.Link active={home.isActive} href={home.href}>
								Home
							</Nav.Link>
							<Nav.Link
								active={playground.isActive}
								href={playground.href}
							>
								Playground
							</Nav.Link>
							<Nav.Link
								active={monarch.isActive}
								href={monarch.href}
							>
								Monarch
							</Nav.Link>
							<Nav.Link
								active={switchRoute.isActive}
								href={switchRoute.href}
							>
								Switch Up
							</Nav.Link>
							<Nav.Link active={docs.isActive} href={docs.href}>
								Documentation
							</Nav.Link>
						</Nav>

						<Nav className="ms-auto">
							<NavDropdown
								title={
									<>
										<span className="nav-icon bi-download" />
										<span className="hidden-text">
											{" "}
											Get Started{" "}
										</span>
									</>
								}
								className="download-dropdown"
								align="end"
							>
								{/*<NavDropdown.Item href="#action/3.1">
									Get Started 0.33.0
						</NavDropdown.Item>*/}
								<NavDropdown.Item href="./switch.html">Open Switch Up</NavDropdown.Item>
							</NavDropdown>

							<Nav.Link href="./switch.html">
								<span className="nav-icon bi-github" />
								<span className="hidden-text"> Launch </span>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}
