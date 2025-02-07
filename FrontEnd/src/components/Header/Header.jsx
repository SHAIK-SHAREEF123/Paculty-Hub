import React from 'react'

export default function Header() {
    return (
        <header className="bg-white bg-opacity-30 backdrop-blur-md shadow-lg fixed w-full top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <a href="/" className="text-2xl font-bold text-blue-700 hover:text-blue-900 transition-all">
                    MyBrand
                </a>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="text-black text-lg font-medium hover:text-blue-700 transition-all">
                        Home
                    </a>
                    <a href="#" className="text-black text-lg font-medium hover:text-blue-700 transition-all">
                        About
                    </a>
                    <a href="#" className="text-black text-lg font-medium hover:text-blue-700 transition-all">
                        Services
                    </a>
                    <a href="#" className="text-black text-lg font-medium hover:text-blue-700 transition-all">
                        Contact
                    </a>
                </nav>

                {/* Authentication Button */}
                <a
                    href="/login"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                    Login
                </a>

                {/* Mobile Menu Icon */}
                <button className="md:hidden text-black text-2xl focus:outline-none">
                    ☰
                </button>
            </div>
        </header>
    );
}
