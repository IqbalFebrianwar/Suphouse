import dynamic from "next/dynamic"

const ButtonSignOut = dynamic (()=> import ("@/app/auth/signin/components/buttonsignout"))


const Navbar = () => {
    return <div className="navbar bg-white lg:px-48 max-lg:px-5 text-gray-950">
        <div className="navbar-start">
            <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle drawer-button lg:hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h7" />
                </svg>
            </label>
        </div>
        <div className="navbar-center">
            <a className="btn btn-ghost text-xl">Suphouse</a>
        </div>
        <div className="navbar-end">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://media.istockphoto.com/id/1300845620/de/vektor/user-icon-flat-isolated-auf-wei%C3%9Fem-hintergrund-benutzersymbol-vektor-illustration.jpg?s=612x612&w=0&k=20&c=VSrirSynT-0Sg1li-R9kqIZE7cDizbThAgjDcebXXlI=" />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <ButtonSignOut />
                </ul>
            </div>
        </div>
    </div>
}
export default Navbar