export default function Footer() {
    return (
        <footer className=" text-black py-4 text-center">
            <p>&copy; {new Date().getFullYear()} Ticketier. All rights reserved.</p>
            <p>
                Follow us on 
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 ml-2">Twitter</a>, 
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 ml-2">Facebook</a>, and 
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 ml-2">Instagram</a>.
            </p>
        </footer>
    );
}