export const Footer = () => {
    return (
        <footer className="bg-black p-4 fixed w-full bottom-0 left-0 z-10 flex items-center justify-between">
            <div className="text-blue-500 text-lg font-bold ">
                <p>&copy;{new Date().getFullYear()}돌려돌려 돌림판.All rights reserved</p>
            </div>
        </footer>
    )
}